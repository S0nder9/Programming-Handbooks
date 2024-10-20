// Глава 1: Введение в MongoDB - Регистрация пользователей

// В этом разделе мы рассмотрим, как реализовать регистрацию пользователей в MongoDB с использованием Node.js, Express и JWT для аутентификации.
// Мы будем создавать нового пользователя, сохранять его в базе данных и возвращать токен для авторизации.

// Основные шаги:

// 1. Подключение необходимых модулей:
// Мы используем `jsonwebtoken` для создания токенов, `User` - модель пользователя, и `catchAsync` - утилита для обработки асинхронных функций.
const jwt = require("jsonwebtoken");
const User = require("../models/userModal");
const catchAsync = require("../utils/catchAsync");

// 2. Контроллер регистрации пользователя:
// Функция `signup` принимает данные запроса и создает нового пользователя в базе данных.
// После создания пользователя она генерирует JWT для аутентификации и возвращает его вместе с информацией о пользователе.
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    // Генерация JWT для пользователя
    const token = jwt.sign(
        {
            id: newUser._id, // идентификатор пользователя
        },
        process.env.JWT_SECRET, // секретный ключ для подписи токена
        { expiresIn: process.env.JWT_EXPIRES_IN } // время жизни токена
    );

    // Ответ сервера с данными о пользователе и токеном
    res.status(201).json({
        status: "success",
        token,
        data: {
            user: newUser,
        },
    });
});

// Подробности реализации:

// 1. Модель пользователя:
// Модель `User` должна содержать поля, такие как `name`, `email`, `password`, и `passwordConfirm`.
// Для пароля можно добавить валидаторы и шифрование, чтобы обеспечить безопасность данных пользователя.
// Пример модели (UserModal.js):
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name!"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email!"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        minlength: 8,
        select: false, // пароль не возвращается при запросе пользователя
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password!"],
        validate: {
            // Проверка совпадения паролей
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords are not the same!",
        },
    },
});

// Хук перед сохранением пользователя - шифрует пароль
userSchema.pre("save", async function (next) {
    // Хешируем пароль только если он был изменен
    if (!this.isModified("password")) return next();

    // Хешируем пароль
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined; // Убираем поле подтверждения пароля
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;

// 2. catchAsync утилита:
// `catchAsync` помогает обрабатывать асинхронные функции, чтобы не писать блоки try/catch в каждом контроллере.
module.exports = fn => (req, res, next) => {
    fn(req, res, next).catch(next);
};

// Итог:
// Мы создали функцию регистрации, которая создает пользователя в базе данных и возвращает JWT.
// Этот токен можно использовать для последующей аутентификации пользователя в приложении.
