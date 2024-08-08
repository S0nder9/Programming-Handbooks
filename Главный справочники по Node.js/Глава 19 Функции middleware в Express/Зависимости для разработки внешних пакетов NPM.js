// Глава 19: Функции middleware в Express - Зависимости для разработки внешних пакетов NPM в Node.js

// В Express.js middleware функции играют ключевую роль в обработке запросов и ответов.
// Middleware функции могут использоваться для выполнения таких задач, как аутентификация, обработка ошибок и добавление заголовков.
// При разработке внешних пакетов NPM для Node.js, важно понимать, как управлять зависимостями и использовать middleware функции.

// Как работают функции middleware:
// Middleware функции - это функции, которые получают объект запроса (req), объект ответа (res) и функцию next() в качестве параметров.
// Они могут модифицировать запрос и ответ, а затем передать управление следующему middleware или обработчику маршрута.

// Пример middleware функции в Express:
const express = require('express');
const app = express();

// Простейший middleware для логирования запросов
const loggerMiddleware = (req, res, next) => {
  console.log(`Request method: ${req.method}, Request URL: ${req.url}`);
  next(); // Передаем управление следующему middleware
};

app.use(loggerMiddleware); // Подключаем middleware ко всем маршрутам

// Middleware для обработки JSON
app.use(express.json());

// Пример обработчика маршрута
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Пример middleware для обработки ошибок
const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
};

app.use(errorHandlerMiddleware); // Подключаем middleware для обработки ошибок

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Зависимости для разработки внешних пакетов NPM в Node.js:
// При создании внешних пакетов NPM для Node.js важно правильно управлять зависимостями.
// Зависимости могут быть обязательными для работы пакета или необходимыми только для разработки.

// Пример зависимостей для разработки пакета:
// В package.json можно указать зависимости для разработки в разделе "devDependencies":
// {
//   "name": "my-package",
//   "version": "1.0.0",
//   "dependencies": {
//     "express": "^4.17.1"
//   },
//   "devDependencies": {
//     "mocha": "^8.4.0",
//     "chai": "^4.3.4"
//   }
// }

// Зависимости в разделе "devDependencies" обычно включают инструменты для тестирования, сборки и разработки.
// Эти зависимости не нужны для работы пакета в производственной среде, но необходимы для тестирования и разработки.

