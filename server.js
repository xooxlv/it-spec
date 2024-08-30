const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const path = require('path');

const app = express();
const host = '127.0.0.1';
const port = 80;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static('static'));

const developer_activities = [
    {
        'service_name': 'Разработка программного обеспечения',
        'img_path' : 'img/program_code.jpg',
        'description': 'Создание высококачественного программного обеспечения, от написания кода до тестирования и внедрения.',
        'about_page_link' : '#'
    },
    {
        'service_name': 'Веб-разработка',
        'img_path' : 'img/site_code.jpg',
        'description': 'Создание адаптивных и функциональных веб-сайтов, оптимизированных для различных устройств.',
        'about_page_link' : '#'
    },
    {
        'service_name': 'Системное программирование',
        'img_path' : 'img/microsheme.jpg',
        'description': 'Разработка программного обеспечения для работы на различных операционных системах и платформах.',
        'about_page_link' : '#'
    },
    {
        'service_name': 'Исследование новых технологий',
        'img_path' : 'img/new_technologies.webp',
        'description': 'Погружение в новейшие информационные технологии и инновации, создание решений для развития будущего.',
        'about_page_link' : '#'
    },
    {
        'service_name': 'Моделирование и симуляция',
        'img_path' : 'img/modelling.jpg',
        'description': 'Использование передовых методов моделирования для создания и анализа сложных систем.',
        'about_page_link' : '#'
    },
    {
        'service_name': 'Разработка искусственного интеллекта',
        'img_path' : 'img/ai.jpg',
        'description': 'Создание и внедрение алгоритмов машинного обучения и ИИ для решения сложных задач и оптимизации процессов.',
        'about_page_link' : '#'
    }
];

app.get('/', (req, res) => {

    res.render('index', {
        title: 'Главная',
        header_title: 'Услуги разработки, установки и наладки программного обеспечения, консультации',
        activity_title: 'Деятельность разработчиков программного обеспечения',
        activities: developer_activities
    });
});

app.post('/quest', (req, res) => {
    console.log(req.body);
    res.send('Заявка принята!');
});

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});
