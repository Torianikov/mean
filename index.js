let express = require('express'); // подключение express.js
let cors = require('cors'); // подлкючения cors, длч внедрение разных api, и взаемодействие с другими веб сайтами
let bodyParser = require('body-parser'); // для обработке post запросов
let mongoose = require('mongoose'); // для работы с monogodb
let passport = require('passport'); // для работы с регистрацией 
let path = require('path');
let config = require('./config/db'); // файл с путем и кодом к БД
let account = require('./routes/account'); //файл с отслеживаением URL

let app = express();

let port = process.env.PORT || 8080;

app.use(passport.initialize()); //инициализируем библиотеку
app.use(passport.session()); //инициализируем сесии

require('./config/passport')(passport); // передаем в файл с авторизацией библотеку и сесии

app.use(cors()); // подключаем cors

app.use(bodyParser.json()); // подключения body-parser

app.use(express.static(path.join(__dirname, 'public'))); //подключение папки для статических файлов

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true }); // подключения к MongoDB

// Проверка на успешность подлючения
mongoose.connection.on('connected', () => {
    console.log('Мы успешно подключились к БД:')   
});

mongoose.connection.on('error', (err) => {
    console.log('Мы не подключились к БД:' + err);
});


app.get('/', (req,res) => {
    res.send("Hello World"); // отслеживание главной страницы
});

app.use('/account', account); // когда переходим по url адресу который начинаеться на account вызываеться файл account

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.listen(port, () =>{ 
    console.log("Сервер был запущен по порту " + port); //запуск сервара по порту 
});