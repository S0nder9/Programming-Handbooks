// Глава 1: Введение в MongoDB - Защита туристических маршрутов - часть 1

// В этой части мы рассмотрим, как защитить маршруты с использованием JWT для авторизации пользователей.
// Это позволяет удостовериться, что только авторизованные пользователи могут получить доступ к определенным ресурсам, таким как туристические маршруты.

// 1. Генерация токена
// Функция `signToken` создает токен на основе ID пользователя. Она использует секретный ключ и время жизни токена из переменных окружения.

const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign(
        {
            id,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

// 2. Middleware для защиты маршрутов
// `protect` - это middleware, которое проверяет, есть ли токен в заголовке запроса.
// Если токен найден и он корректный, пользователь получает доступ к защищенным маршрутам.
// Если токена нет или он недействителен, пользователю возвращается ошибка.

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    // Проверяем, есть ли токен в заголовке авторизации и начинается ли он с 'Bearer'
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1]; // Извлекаем сам токен
    }

    console.log(token); // Логируем токен для проверки

    // Если токен отсутствует, отправляем ошибку
    if (!token) {
        return next(new AppError("You are not logged in! Please log in to get access.", 401));
    }

    // Продолжаем выполнение, если токен присутствует
    next();
});

// 3. Применение middleware к маршрутам
// Для использования защиты маршрута мы добавляем middleware `protect` к маршруту, который нужно защитить.
// В данном примере мы защищаем маршрут для получения всех туристических маршрутов.

const express = require('express');
const router = express.Router();
const authController = require('./authController');
const tourController = require('./tourController');

router.route("/")
    .get(authController.protect, tourController.getAllTours);

// Итог:
// В этой части мы настроили базовую защиту маршрутов с использованием JWT.
// Мы создали функцию для генерации токенов, middleware для проверки токена и применили его к маршруту.
// В следующей части мы добавим дополнительную валидацию токена и обработку ошибок.
