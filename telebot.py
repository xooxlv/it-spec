import logging
import psycopg2
from telegram import Update
from telegram.ext import Application, CommandHandler, CallbackContext, JobQueue

# Логирование
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# Настройки для подключения к базе данных
DB_HOST = 'localhost'
DB_NAME = 'postgres'
DB_USER = 'postgres'
DB_PASSWORD = 'root'

# Функция для получения новых записей из базы данных
def get_new_records():
    try:
        # Подключение к базе данных
        conn = psycopg2.connect(host=DB_HOST, dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD)
        cursor = conn.cursor()

        # Пример SQL-запроса для получения новых записей
        query = "SELECT name, phone, email, task FROM apeal WHERE is_sent = FALSE"
        cursor.execute(query)

        # Получение всех новых записей
        records = cursor.fetchall()

        # Закрытие соединения
        cursor.close()
        conn.close()

        return records

    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(f"Ошибка при подключении к базе данных: {error}")
        return []

# Функция для обновления статуса записи (отметить как отправленную)
def mark_as_sent(phone_number):
    try:
        # Подключение к базе данных
        conn = psycopg2.connect(host=DB_HOST, dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD)
        cursor = conn.cursor()

        # Обновляем статус записи
        update_query = "UPDATE apeal SET is_sent = TRUE WHERE phone = %s"
        cursor.execute(update_query, (phone_number,))
        conn.commit()

        # Закрытие соединения
        cursor.close()
        conn.close()

    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(f"Ошибка при обновлении записи в базе данных: {error}")

# Функция для отправки сообщений пользователям
async def send_messages(context: CallbackContext):
    records = get_new_records()

    for record in records:
        name, phone_number, email, task = record
        message_text = f"Имя: {name}\nТелефон: {phone_number}\nEmail: {email}\nЗадача: {task}"

        try:
            # Получаем ID пользователя по номеру телефона (здесь необходимо доработать логику поиска)
            user_id = get_user_id_by_phone(phone_number)
            
            if user_id:
                # Отправляем сообщение пользователю
                await context.bot.send_message(chat_id=user_id, text=message_text)

                # Отмечаем запись как отправленную
                mark_as_sent(phone_number)
        except Exception as e:
            logger.error(f"Ошибка при отправке сообщения: {e}")

# Функция для получения chat_id пользователя по номеру телефона (упрощенная логика)
def get_user_id_by_phone(phone_number):
    # В реальном сценарии нужно реализовать логику для поиска chat_id по номеру телефона
    phone_to_chat_id = {
        "1234567890": 123456789,  # Пример сопоставления номера телефона и chat_id
    }
    return phone_to_chat_id.get(phone_number)

# Команда /start
async def start(update: Update, context: CallbackContext):
    await update.message.reply_text('Привет! Я бот для отправки уведомлений.')

# Основная функция для запуска бота
async def main():
    # Создание бота и его запуск
    application = Application.builder().token("7831572718:AAFLSjT2Fw40kEdJsgn-tzaGsfDCQikPEj0").build()

    # Настройка JobQueue
    job_queue = JobQueue()
    job_queue.set_application(application)
    
    # Запускаем задачу для периодической отправки сообщений
    job_queue.run_repeating(send_messages, interval=60, first=10)  # Проверка каждые 60 секунд

    # Обработчик команды /start
    application.add_handler(CommandHandler("start", start))

    # Инициализация и запуск бота
    await application.initialize()
    await application.start()
    await job_queue.start()  # Запуск JobQueue
    await application.idle()

if __name__ == '__main__':
    import asyncio
    asyncio.run(main())
