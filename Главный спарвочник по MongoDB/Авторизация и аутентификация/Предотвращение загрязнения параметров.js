// Глава 1: Введение в MongoDB (mongoose) - Предотвращение загрязнения параметров

// Веб-приложения часто принимают пользовательские данные через параметры запроса.
// Однако это может привести к загрязнению параметров, когда пользователь может изменить значения параметров, 
// что может повлиять на поведение приложения и привести к нежелательным последствиям.

// Для предотвращения загрязнения параметров можно использовать библиотеку hpp (HTTP Parameter Pollution).
// Эта библиотека помогает фильтровать параметры запроса и позволяет задавать белый список параметров, 
// которые разрешены для использования в запросах.

// Пример настройки hpp в Express.js приложении:
const express = require('express');
const hpp = require('hpp');
const app = express();

// Устанавливаем белый список параметров
app.use(
    hpp({
        whitelist: process.env.WHITELIST_FOR_SEARCH.split(','), // Разделяем строку на массив
    })
);

// Пример определения белого списка параметров в .env файле:
process.env.WHITELIST_FOR_SEARCH = "duration,ratingAverage,ratingQuantity,price,difficulty,maxGroupSize";

// Белый список параметров позволяет предотвратить загрязнение параметров,
// гарантируя, что только указанные параметры будут обработаны сервером.

// Пример использования фильтрации параметров в запросе:
app.get('/api/products', (req, res) => {
    const { duration, ratingAverage, ratingQuantity, price, difficulty, maxGroupSize } = req.query;
    // Здесь можно безопасно использовать параметры, так как они прошли через hpp
    // Например, получение продуктов из MongoDB с использованием mongoose
    // Пример запроса к базе данных:
    Product.find({
        duration,
        ratingAverage,
        ratingQuantity,
        price,
        difficulty,
        maxGroupSize
    })
    .then(products => res.json(products))
    .catch(err => res.status(500).json({ message: 'Error fetching products', error: err }));
});

// Итог:
// Использование hpp для предотвращения загрязнения параметров — это важный шаг в обеспечении безопасности вашего приложения.
// Настройка белого списка параметров гарантирует, что только определенные значения могут быть обработаны,
// что помогает избежать непредвиденных ошибок и атак на ваше приложение.
