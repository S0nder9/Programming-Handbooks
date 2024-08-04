// Глава 17: Веб фреймворк Express - Введение в Express в Node.js

// Express - это минималистичный и гибкий веб-фреймворк для Node.js, который предоставляет множество полезных инструментов для создания веб-приложений и API.
// Он упрощает обработку HTTP-запросов и маршрутизацию, а также предлагает широкий спектр middleware для добавления функциональности в приложения.

// Установка Express:
// Для установки Express используйте npm (Node Package Manager):
// Откройте терминал и выполните команду:
npm install express

// Создание простого сервера с использованием Express:
const express = require('express');
const app = express();
const port = 3000;

// Определяем простой маршрут для главной страницы:
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Запускаем сервер на указанном порту:
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Обработка различных HTTP-методов:
// Express позволяет легко обрабатывать различные HTTP-методы, такие как GET, POST, PUT, DELETE и другие.
// Пример обработки GET-запроса:
app.get('/user', (req, res) => {
  res.send('GET request to the user page');
});

// Пример обработки POST-запроса:
app.post('/user', (req, res) => {
  res.send('POST request to the user page');
});

// Middleware в Express:
// Middleware - это функции, которые выполняются в процессе обработки запроса к серверу.
// Они могут изменять объект запроса (req), объект ответа (res) или завершать цикл запроса-ответа.
// Пример использования middleware для логирования запросов:
const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// Используем middleware в приложении:
app.use(loggerMiddleware);

// Обработка ошибок:
// В Express можно легко обрабатывать ошибки с помощью middleware.
// Пример обработки ошибок:
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Итог:
// Express - это мощный и гибкий веб-фреймворк для Node.js, который упрощает создание веб-приложений и API.
// Он предоставляет множество инструментов для обработки HTTP-запросов, маршрутизации, использования middleware и обработки ошибок.
