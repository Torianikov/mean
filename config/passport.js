let config = require('./db'); // файл с путем и кодом к БД
let User = require('../models/user'); // файл с моделю для добавления клиента

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function(passport){
var opts = {} // будет содержать опции по поводу авторизации
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // указываем тип авторизации fromAuthHeaderAsBearerToken
opts.secretOrKey = config.secret; // указываем секретный ключ с файла db
// opts.issuer = 'accounts.examplesoft.com'; // какие то параметры для веб сайта
// opts.audience = 'yoursite.net'; // какие то параметры для веб сайта
passport.use(new JwtStrategy(opts, function(jwt_payload, done) { // указываем какую стратегию используем JwtStrategy, jwtpayload - пользователь который хочет авторизоваться на сайте
    User.findOne({id: jwt_payload.sub}, function(err, user) { // осуществляем поиск по БД
        if (err) {
            return done(err, false); // есть ошибка
        }
        if (user) {
            return done(null, user); // есть такой пользователь
        } else {
            return done(null, false); // нету такого пользователя
            // or you could create a new account
        }
    });
}));
}

