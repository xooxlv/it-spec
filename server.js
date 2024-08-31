const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const path = require('path');
const { title } = require('process');

const app = express();
const host = '127.0.0.1';
const port = 80;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static('static'));

developer_activities = [
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

acitvityes = {
    title : 'Деятельность разработчиков программного обеспечения',
    list : developer_activities
}


persons = [
    {
        'name' : 'Иван Иванов',
        'about' : 'CEO. Специализируется на стратегии и управлении проектами. Опыт более 15 лет в IT-сфере.',
        'img' : 'img/seo.png'
    },
    {
        'name' : 'Анна Смирнова',
        'about' : 'Технический директор. Эксперт в разработке программного обеспечения и архитектуре систем. Более 10 лет опыта.',
        'img' : 'img/proger_women.png'
    },
    {
        'name' : 'Сергей Петров',
        'about' : 'Главный разработчик. Специализируется на веб-технологиях и интеграции систем. Опыт работы более 8 лет.',
        'img' : 'img/main_proger.png'
    }
];

offices = [
    {
        img: 'img/moscow_office.jpg',
        name: 'Офис в Калуге',
        about: 'Наш главный офис находится в центре Калуги, где работают наши ведущие специалисты и управленцы.'
    },
    {
        img: 'img/sbp_office.jpg',
        name : 'Офис в Санкт-Петербурге',
        about : 'Наш офис в Санкт-Петербурге специализируется на разработке и поддержке программного обеспечения для наших клиентов в северной столице.'
    }
    
]

about = {
    company : {
        title : 'О нас',
        first_tex_entry:  'Мы – команда профессионалов, объединенных общей целью: предоставление высококачественных IT-услуг для бизнеса и частных клиентов. Наша компания специализируется на разработке программного обеспечения, установке и настройке систем, а также интеграции сторонних сервисов.',
        second_text_entry : 'Мы гордимся тем, что можем предложить уникальные решения, отвечающие самым высоким стандартам качества и безопасности. Наша команда имеет богатый опыт в различных областях IT и использует передовые технологии для достижения наилучших результатов.'
    },
    employers : {
        title : 'Наша команда',
        list : persons
    },
    offices : {
        title : 'Наши офисы',
        list: offices
    }
}


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Главная',
        header_title: 'Услуги разработки, установки и наладки программного обеспечения, консультации',
        activities: acitvityes
    });
});

app.get('/about', (req, res) =>{

    res.render('about', {
        title: "О нас",
        header_title: 'Услуги разработки, установки и наладки программного обеспечения, консультации',
        about : about
    })
})

app.post('/quest', (req, res) => {
    console.log(req.body);
    res.send('Заявка принята!');
});

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});
