// Глава 1: Введение в MongoDB - Создание новых пользователей

// MongoDB — это мощная и гибкая база данных NoSQL, которая отлично подходит для хранения и управления большими объемами данных.
// В этой главе мы рассмотрим, как создать нового пользователя в MongoDB с помощью Mongoose, ORM-библиотеки для работы с MongoDB в Node.js.

// Пример кода, реализующего создание нового пользователя:

// Импорт модели пользователя и утилиты для обработки асинхронных функций:
const User = require("../models/userModal"); // Импорт модели User
const catchAsync = require("../utils/catchAsync"); // Утилита для обработки асинхронных функций

// Экспортируем функцию signup для создания нового пользователя:
exports.signup = catchAsync(async (req, res, next) => {
    // Создаем нового пользователя на основе данных, переданных в теле запроса
    const newUser = await User.create(req.body);

    // Возвращаем ответ с кодом 201 (создано) и данными нового пользователя
    res.status(201).json({
        status: "success",
        data: {
            user: newUser,
        },
    });
});

// Как это работает:

// 1. Импорт модели:
// В этом примере модель User импортируется из файла модели пользователя. 
// Модель представляет собой структуру данных, используемую для создания и взаимодействия с документами в коллекции MongoDB.

// 2. Импорт утилиты catchAsync:
// Утилита catchAsync используется для обработки ошибок в асинхронных функциях. 
// Она позволяет избегать избыточного использования try-catch блоков, упрощая код и делая его более читаемым.

// 3. Создание нового пользователя:
// Метод create из Mongoose используется для создания нового документа (пользователя) на основе данных, полученных из запроса (req.body).
// В MongoDB новый документ добавляется в коллекцию users.

// 4. Отправка ответа:
// После успешного создания пользователя, возвращается ответ с кодом 201 и статусом "success". 
// В теле ответа содержится информация о созданном пользователе.

// Пример модели пользователя (userModal.js):
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

// Итог:
// С помощью Mongoose и MongoDB вы можете легко создавать новых пользователей и управлять их данными.
// В этом примере используется простая модель пользователя с полями name, email, password и passwordConfirm.
// Функция signup позволяет создать нового пользователя на основе данных, переданных клиентом, и возвращает ответ с данными нового пользователя.
