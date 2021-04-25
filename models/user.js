let mongoose = require('mongoose'); // для работы с бд
let bcrypt = require('bcryptjs'); // для хэширования паролей
let config = require('../config/db'); // данные подключение к БД

let UserSchema = mongoose.Schema({ // схема данных которые мы ожидаем от пользователя
    name: {
        type : String // тип данных
    },
    email: {
        type: String, // тип данных
        required :true // указиваем что поле есть обьязателным
    },
    login: {
        type: String, // тип данных
        required :true // указиваем что поле есть обьязателным
    },
    password: {
        type: String, // тип данных
        required :true // указиваем что поле есть обьязателным
    },

});

let  User = module.exports = mongoose.model('User', UserSchema); // экспорт обьекта User, который является обьектом на основе схемы UserSchema

module.exports.getUserByLogin = function(login, callback){ //функция отвечает за поиск пользователя по логину 
    let query = {login: login}; // выборка пользователя по логину
    User.findOne(query, callback); // после выборки передается callback
};

module.exports.getUserById = function(id, callback){ //функция отвечает за поиск пользователя по id 
    User.findById(id, callback);
};

module.exports.addUser = function(newUser, callback){ //функция отвечает добавления нового пользователя в БД
    bcrypt.genSalt(10, (err, salt) =>{ //функция для хэширования 10-количество символов хэширования
        bcrypt.hash(newUser.password, salt, (err, hash) => { //первый параметр который хэшируем
            if(err) throw err; //если ошибка то выбрасываем ее
            newUser.password = hash; // присваиваем новый хэшированный пароль
            newUser.save(callback); // сохраняем пользователя в БД
        });
    });  
};

module.exports.comparePass = function(passFromUser, userDBPass, callback){ //функция отвечает сравнивания паролей с БД и с введеным
    bcrypt.compare(passFromUser, userDBPass, (err, isMatch)=>{// сравниваем два пароля
        if(err) throw err; // если ошибка выбрасывем ее
        callback(null, isMatch); // если совпадают передаем что ошибки нету и переменную в которой если совпадают true если не совпадают false
    });
};