const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const path = require('path');
const { title } = require('process');
const multer = require('multer');

const db = require('./db')
const Appeal = db.Appeal

const app = express();
const host = '95.163.228.10';
const port = 80;

const upload = multer({ dest: 'uploads/' });

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
hbs.registerPartials(path.join(__dirname, 'views/other'));


hbs.registerHelper('eq', function (a, b) {
    return a === b;
});

app.use(express.static('static'));
app.use(express.json());

const acitvityes = {
    title: 'Деятельность разработчиков программного обеспечения',
    list: [
        {
            'service_name': 'Разработка программного обеспечения',
            'img_path': 'img/code.png',
            'img_alt_path': 'img/code_proc.jpg',
            'description': 'Создание высококачественного программного обеспечения, от написания кода до тестирования и внедрения.',
            'long_description_main': 'Наша команда разработчиков создает программное обеспечение, которое отвечает высоким стандартам качества и безопасности. Мы используем современные технологии и инструменты для создания эффективных и масштабируемых решений. Наш подход основан на принципах инновационности, гибкости и устойчивости, что позволяет нам создавать продукты, которые отвечают потребностям наших клиентов и помогают им достичь своих целей. Мы инвестируем в постоянное обучение и развитие наших разработчиков, чтобы они были в курсе последних тенденций и технологий в области программного обеспечения. Это позволяет нам предлагать нашим клиентам наиболее эффективные и современные решения, которые помогают им оставаться конкурентоспособными на рынке.',
            'long_description_secondary': 'Мы разрабатываем программное обеспечение для автоматизации и оптимизации бизнес-процессов. Наша цель - создать эффективные и надежные системы, которые помогают нашим клиентам уменьшить затраты, повысить производительность и улучшить качество услуг. Мы создаем программное обеспечение для различных отраслей, включая финансы, здравоохранение, образование и другие. Наша экспертиза позволяет нам понимать уникальные потребности каждой отрасли и создавать решения, которые отвечают им. Наше программное обеспечение разрабатывается для решения конкретных задач и проблем, с которыми сталкиваются наши клиенты.',
            'long_description_final': 'Если вы ищете надежного партнера для разработки программного обеспечения, который может помочь вам достичь ваших целей и остаться конкурентоспособными на рынке, то наша команда готовы помочь. Мы предлагаем индивидуальный подход, гибкость и готовность к сотрудничеству, чтобы создать программное обеспечение, которое отвечает вашим уникальным потребностям и требованиям. Свяжитесь с нами сегодня, чтобы обсудить ваши проекты и начать создавать программное обеспечение, которое поможет вам достичь успеха.'
        },
        {
            'service_name': 'Веб-разработка',
            'img_path': 'img/site_code.jpg',
            'img_alt_path': 'img/site_page.jpg',
            'description': 'Создание адаптивных и функциональных веб-сайтов, оптимизированных для различных устройств.',
            'long_description_main': 'Наша команда веб-разработчиков создает сайты, которые привлекают внимание и обеспечивают отличный пользовательский опыт. Мы используем современные технологии, такие как HTML5, CSS3 и JavaScript, для создания интерактивных и динамических веб-приложений. Мы также обеспечиваем высокую доступность и безопасность наших сайтов, чтобы наши клиенты могли чувствовать себя уверенно. Наша цель - создать сайт, который будет соответствовать вашим ожиданиям и помогать вам достичь ваших целей.',
            'long_description_secondary': 'Мы разрабатываем веб-сайты для различных целей, включая электронную коммерцию, маркетинг и образование. Сайты помогают лучше узнать компанию, поэтому мы разрабатываем их на высоком уровне.',
            'long_description_final': 'Наши веб-приложения является высокопроизводительным, что обеспечивает быструю загрузку и отзывчивость для пользователей. Благодаря кросплатформенности, наши сайты могут работать на различных устройствах и операционных системах. Мы также обеспечиваем интеграцию с базами данных, что позволяет эффективно хранить и обрабатывать данные. Благодаря открытой архитектуре, наши сайты легко расширяемы и могут быть адаптированы к меняющимся потребностям бизнеса.'
        },
        {
            'service_name': 'Системное программирование',
            'img_alt_path': 'img/pulse.jpg',
            'img_path': 'img/integr.png',
            'description': 'Разработка программного обеспечения для работы на различных операционных системах и платформах.',
            'long_description_main': 'Наша команда системных программистов создает программное обеспечение для встраиваемых систем, которое работает на различных операционных системах и платфорамх. Мы используем языки программирования, такие как C, C++ и Java, для создания эффективных и надежных решений.',
            'long_description_secondary': 'Мы разрабатываем программное обеспечение для различных отраслей, включая финансы, здравоохранение и образование.',
            'long_description_final': 'Программирование систем требует глубокого понимания компьютерной архитектуры, операционных систем и низкоуровневых языков программирования. Разработка встраиваемых систем включает в себя проектирование и реализацию программного обеспечения для специализированных компьютерных систем. Если Вы нуждаетесь в подобного рода системе, свяжитесь с нами - IT Spec. Мы готовы помочь вам в разработке и реализации системного программирования и встраиваемых систем.'
        },
        {
            'service_name': 'Исследование новых технологий',
            'img_path': 'img/new_technologies.webp',
            'img_alt_path': 'img/science.webp',
            'description': 'Погружение в новейшие информационные технологии и инновации, создание решений для развития будущего.',
            'long_description_main': 'Наша команда специалистов по исследованию новых технологий занимается глубоким анализом самых передовых и перспективных областей информационных технологий. Мы исследуем и внедряем инновационные технологии, такие как искусственный интеллект, блокчейн и квантовые вычисления, чтобы разработать решения, которые могут существенно изменить бизнес-пейзаж и общество. Наша цель — создать технологические прорывы, которые открывают новые возможности и помогают нашим клиентам оставаться на передовой.',
            'long_description_secondary': 'Мы активно сотрудничаем с ведущими университетами, научно-исследовательскими институтами и технологическими стартапами, чтобы не только изучать, но и внедрять новейшие достижения в области технологий. Это сотрудничество позволяет нам предлагать нашим клиентам наиболее актуальные и инновационные решения для решения их задач и улучшения их бизнес-процессов.',
            'long_description_final': 'Исследование новых технологий позволяет нам находиться на острие прогресса и предоставлять нашим клиентам уникальные решения, которые значительно опережают текущие рыночные тренды. Мы предлагаем услуги по разработке и интеграции инновационных технологий, которые могут трансформировать бизнес-процессы, повысить их эффективность и создать новые конкурентные преимущества. С нами вы сможете не только адаптироваться к изменениям в технологическом ландшафте, но и воспользоваться ими для достижения стратегических целей.'

        },
        {
            'service_name': 'Моделирование и симуляция',
            'img_path': 'img/simulate.webp',
            'img_alt_path': 'img/modelling_fin.jpg',
            'description': 'Использование передовых методов моделирования для создания и анализа сложных систем.',
            'long_description_main': 'Наша команда специалистов по моделированию и симуляции разрабатывает точные модели и симуляции для анализа и оптимизации сложных систем. Мы применяем передовые методы и инструменты, такие как Python, MATLAB и специализированные программные пакеты, чтобы создать реалистичные и детализированные модели, которые помогают в принятии обоснованных решений. Наши симуляции охватывают широкий спектр областей, от инженерии до экономики, и предназначены для анализа поведения систем в различных сценариях.',
            'long_description_secondary': 'Мы разрабатываем модели для различных отраслей, включая финансы, здравоохранение и образование. Эти модели помогают в прогнозировании, планировании и оценке воздействия различных факторов на систему. Наши решения позволяют нашим клиентам выявлять слабые места, оптимизировать процессы и предсказывать результаты, что делает их более подготовленными к вызовам и изменениям в их областях деятельности.',
            'long_description_final': 'Моделирование и симуляция предоставляют нашим клиентам мощные инструменты для глубокого анализа и понимания сложных систем. Наши услуги включают не только создание моделей, но и их верификацию и калибровку для обеспечения максимальной точности и надежности. Мы помогаем нашим клиентам использовать полученные данные для улучшения их стратегий и достижения поставленных целей, что позволяет им опережать конкурентов и успешно справляться с вызовами рынка.'

        },
        {
            'service_name': 'Разработка искусственного интеллекта',
            'img_path': 'img/ai.jpg',
            'img_alt_path': 'img/net.webp',
            'description': 'Создание и внедрение алгоритмов машинного обучения и ИИ для решения сложных задач и оптимизации процессов.',
            'long_description_main': 'Наша команда разработчиков искусственного интеллекта сосредоточена на создании и внедрении продвинутых алгоритмов машинного обучения и ИИ, которые помогают решать сложные задачи и оптимизировать процессы в различных сферах. Мы применяем самые современные методы, такие как глубокое обучение, обработка естественного языка и компьютерное зрение, чтобы создавать интеллектуальные системы, способные обрабатывать и анализировать большие объемы данных, делать предсказания и автоматизировать процессы. Наши решения направлены на повышение эффективности и конкурентоспособности бизнеса.',
            'long_description_secondary': 'Мы предлагаем решения для различных отраслей, включая здравоохранение, финансы, производство и розничную торговлю. Наши системы помогают в улучшении клиентского опыта, повышении операционной эффективности и создании новых бизнес-возможностей. Мы также занимаемся внедрением ИИ в существующие бизнес-процессы, что позволяет нашим клиентам извлекать максимальную пользу из своих данных и улучшать результаты своей деятельности.',
            'long_description_final': 'Наши разработки в области искусственного интеллекта обеспечивают комплексное решение для бизнес-задач, что позволяет нашим клиентам оставаться на передовой технологий и достигать своих целей. Мы предлагаем полный спектр услуг — от проектирования и разработки до внедрения и поддержки ИИ-систем, что гарантирует их эффективную интеграцию и бесперебойную работу. С нами вы получите не только инновационные технологии, но и стратегическую поддержку, необходимую для успешного использования ИИ в вашем бизнесе.'
        }

    ]
}

const persons = [
    {
        'name': 'Иван Иванов',
        'about': 'CEO. Специализируется на стратегии и управлении проектами. Опыт более 15 лет в IT-сфере.',
        'img': 'img/seo.png'
    },
    {
        'name': 'Анна Смирнова',
        'about': 'Технический директор. Эксперт в разработке программного обеспечения и архитектуре систем. Более 10 лет опыта.',
        'img': 'img/proger_women.png'
    },
    {
        'name': 'Сергей Петров',
        'about': 'Главный разработчик. Специализируется на веб-технологиях и интеграции систем. Опыт работы более 8 лет.',
        'img': 'img/main_proger.png'
    }
];

const offices = [
    {
        img: 'img/moscow_office.jpg',
        name: 'Офис в Калуге',
        about: 'Наш главный офис находится в центре Калуги, где работают наши ведущие специалисты и управленцы.'
    }
];

const about = {
    company: {
        title: 'О нас',
        first_text_entry: 'Мы – команда профессионалов, объединенных общей целью: предоставление высококачественных IT-услуг для бизнеса и частных клиентов. Наша компания специализируется на разработке программного обеспечения, установке и настройке систем, а также интеграции сторонних сервисов.',
        second_text_entry: 'Мы гордимся тем, что можем предложить уникальные решения, отвечающие самым высоким стандартам качества и безопасности. Наша команда имеет богатый опыт в различных областях IT и использует передовые технологии для достижения наилучших результатов.'
    },
    employers: {
        title: 'Наша команда',
        list: persons
    },
    offices: {
        title: 'Наши офисы',
        list: offices
    }
};

const services = {
    free: {
        title: 'Консультативные услуги в области IT',
        list: [
            {
                img: 'img/cloud_solutions.webp',
                name: 'Облачные решения',
                about: 'Консультации по внедрению и оптимизации облачных сервисов для повышения гибкости и уменьшения затрат'
            },
            {
                img: 'img/scale_1200.jfif',
                name: 'Цифровая трансформация',
                about: 'Консультации по внедрению цифровых технологий для повышения производительности, автоматизации процессов и инноваций в бизнесе'
            },
            {
                img: 'img/cybersecurity.webp',
                name: 'Кибербезопасность',
                about: 'Оценка и укрепление безопасности данных и систем для защиты от киберугроз и атак'
            },
            {
                img: 'img/strat.jpg',
                name: 'Стратегия развития IT',
                about: 'Разработка и реализация стратегий развития IT-инфраструктуры, направленных на достижение бизнес-целей и поддержание конкурентного преимущества'
            },

            {
                img: 'img/it_consulting.webp',
                name: 'IT-консалтинг',
                about: 'Анализ и улучшение существующей IT-инфраструктуры для достижения максимальной эффективности и безопасности'
            },

        ]
    },
    paid: {
        title: 'Наши услуги',
        list: [
            {
                category: 'Установка программного обеспечения',
                items: [
                    {
                        title: 'Установка и настройка операционных систем',
                        description: 'Обеспечиваем установку и оптимизацию различных операционных систем, таких как Windows, macOS или Linux, на новые или существующие устройства. Включает в себя настройку системных параметров, установку обновлений и драйверов.'
                    },
                    {
                        title: 'Установка и настройка бизнес-программ',
                        description: 'Помогаем установить и настроить специализированное программное обеспечение для бизнеса, включая CRM-системы, ERP-системы, бухгалтерские программы и офисные пакеты. Обеспечиваем интеграцию с существующими системами и обучение пользователей.'
                    },
                    {
                        title: 'Установка антивирусного ПО и средств безопасности',
                        description: 'Предоставляем услуги по установке и настройке антивирусного программного обеспечения, фаерволов и других средств защиты данных. Проводим конфигурацию для обеспечения максимальной безопасности и защиты от вредоносных программ и угроз.'
                    }
                ]
            },
            {
                category: 'Разработка серверного и десктопного ПО',
                items: [
                    {
                        title: 'Разработка серверных приложений',
                        description: 'Создание и оптимизация серверных решений для обработки больших объемов данных, обеспечения стабильной работы веб-приложений, а также интеграции с базами данных и другими внешними системами. Включает разработку RESTful API, микросервисов и бизнес-логики.'
                    },
                    {
                        title: 'Разработка десктопных приложений',
                        description: 'Проектирование и разработка приложений для настольных операционных систем, таких как Windows, macOS и Linux. Это может включать как простые утилиты, так и сложные корпоративные решения с богатым пользовательским интерфейсом и интеграцией с аппаратным обеспечением.'
                    },
                    {
                        title: 'Миграция и обновление существующих приложений',
                        description: 'Обеспечиваем перенос и обновление старых приложений на новые платформы или технологии. Включает в себя рефакторинг кода, обновление интерфейсов и улучшение производительности.'
                    },
                    {
                        title: 'Разработка приложений с поддержкой многопользовательского режима',
                        description: 'Создание серверных и десктопных приложений с возможностью одновременной работы нескольких пользователей, включая разработку сетевых протоколов, систем управления пользователями и обеспечения безопасности данных.'
                    }
                ]
            },
            {
                category: 'Интеграция сторонних сервисов',
                items: [
                    {
                        title: 'Интеграция с облачными сервисами и платформами',
                        description: 'Настройка и интеграция приложений с облачными сервисами, такими как AWS, Microsoft Azure, Google Cloud или сторонние облачные хранилища и базы данных. Включает подключение к API облачных платформ, настройку автоматических резервных копий, масштабирование и мониторинг.'
                    },
                    {
                        title: 'Интеграция с платёжными системами и шлюзами',
                        description: 'Реализация подключения приложений к платёжным системам и шлюзам, таким как PayPal, Sber или Square. Включает настройку обработки транзакций, управление платёжными данными, а также обеспечение безопасности и соответствие требованиям регулирования платежей.'
                    }
                ]
            }
        ]
    }
};


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Главная',
        header_title: 'Услуги разработки, установки и наладки программного обеспечения, консультации',
        activities: acitvityes,
        current_path: req.path
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'О нас',
        header_title: 'Услуги разработки, установки и наладки программного обеспечения, консультации',
        about: about,
        current_path: req.path
    });
});

app.get('/services', (req, res) => {
    res.render('services', {
        title: 'Услуги',
        header_title: 'Услуги разработки, установки и наладки программного обеспечения, консультации',
        services: services,
        current_path: req.path
    });
});

app.get('/card/:cardId', (req, res) => {
    cardId = req.params.cardId;
    res.render('card', {
        title: 'Услуги',
        header_title: 'Услуги разработки, установки и наладки программного обеспечения, консультации',
        activity: acitvityes['list'][cardId],
    });

});

app.post('/quest', async (req, res) => {
    try {

        const { name, phone } = req.body;
        console.log(req.body);

        const appeal = await Appeal.create({ name, phone });

        res.status(200).json({
            message: 'OK'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при отправке формы' });
    }
});

app.post('/appeal', upload.single('attachment'), async (req, res) => {
    try {
        const { name, email, phone, task } = req.body;
        const attachment = req.file ? req.file.path : null;

        const appeal = await Appeal.create({ name, email, phone, task, attachment });

        res.status(200).json({
            message: 'OK',

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при отправке формы' });
    }
});

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});
