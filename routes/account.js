let express = require('express');
let router = express.Router(); // c помощью router отслеживаем url адресса
let User = require('../models/user'); // файл с моделю для добавления клиента
let passport = require('passport'); 
let jwt = require('jsonwebtoken');
let config = require('../config/db'); // файл с путем и кодом к БД

// router.get('/reg', (req,res) => {
//     res.send("Страница регестрации");
// });

router.post('/reg', (req,res) => { // обработка пост запроса со страницы req, тоесть передача данных из формачки
    let newUser = new User({ //данные которые мы получаем при регестрации мы записываем в новый обьект
        name: req.body.name,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) =>{ // функция добавления нового пользователя
        if(err)
            res.json({success: false, msg: "Пользователь не был добавлен"}); //если ошибка
        else
        res.json({success: true, msg: "Пользователь  был добавлен"}); // если все щк
    });
});

// router.get('/auth', (req,res) => {
//     res.send("Стариница авторизации");
// });

router.post('/auth', (req,res) => { //обработка пост запроса со страницы auth, тоесть передача данных из формачки
    let login = req.body.login; // получаем логин
    let password = req.body.password; // получаем пароль

    User.getUserByLogin(login, (err, user) =>{ // обращаемся к функции поиска по логину
        if(err) throw err; // есть ли ошибка
        if(!user)
            return res.json({success: false, msg: "Такого пользователя нету" }); // если пользователя с таким логином нету
        
        User.comparePass(password, user.password, (err, isMatch)=>{ // проверка пароля пользователя
            if(err) throw err;
            if(isMatch){
                let token = jwt.sign(user.toJSON(), config.secret, { // token это индификатор который будет сложно подделать другими, он установить время сесии, так же в нем будет храниться дополнительная хэшированая информации которая предоставит нам безопастность
                    expiresIn: 3600 * 24 // время на сколько мы авторизируем пользователя
                }); 
                res.json({
                    success: true,
                    token: "JWT " + token,
                    user: {//данные по пользоветели
                        id: user._id,
                        name: user.name,
                        login: user.login,
                        email: user.email
                    }
                });
            } else
                return res.json({success: false, msg: "Пароли не совпадают" }); // если пароль не подходит
        });
    });
});

router.get('/dashboard', passport.authenticate('jwt', {session: false}) , (req,res) => { // второй параметр запрещает доступ к страничке пользователя до тех пор пока клиент не авторизируеться 
    res.send("Кабинет");
});

module.exports = router; // экспорт