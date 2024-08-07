// Глава 19: Функции middleware в Express - Добавление middleware функций в Node.js

// Middleware функции в Express используются для обработки запросов и ответов, выполнения каких-либо действий перед тем, как запрос будет обработан окончательно.
// Middleware функции могут модифицировать объект запроса (req), объект ответа (res) и могут завершить цикл запроса-ответа, вызвав метод next(), чтобы передать управление следующей middleware функции.

// Как работают функции middleware:
// Middleware функции выполняются в порядке их добавления в Express приложение.
// Каждая middleware функция имеет доступ к объектам req, res и к функции next, которую нужно вызвать, чтобы передать управление следующей middleware функции.
// Middleware функции могут выполнять задачи, такие как: логирование запросов, проверка аутентификации, обработка ошибок и другие.

// Пример использования middleware функции для логирования запросов:
const express = require('express');
const app = express();

// Middleware функция для логирования
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); // Передаем управление следующей middleware функции
}

// Добавление middleware функции в приложение
app.use(logger);

// Маршрут для тестирования
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Пример использования middleware функции для проверки аутентификации:
function authenticate(req, res, next) {
  const token = req.headers['authorization'];
  if (token) {
    // Проверяем токен (это упрощенный пример)
    next(); // Токен существует, передаем управление следующей middleware функции
  } else {
    res.status(401).send('Unauthorized');
  }
}

// Добавление middleware функции для проверки аутентификации к определенному маршруту
app.get('/protected', authenticate, (req, res) => {
  res.send('This is a protected route');
});

// Пример использования middleware функции для обработки ошибок:
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
}

// Добавление middleware функции для обработки ошибок в конец всех маршрутов и middleware функций
app.use(errorHandler);

// Итог:
// Middleware функции являются мощным инструментом в Express для управления запросами и ответами.
// Они позволяют добавлять функции для логирования, аутентификации, обработки ошибок и других задач в процессе обработки запросов.
// Используйте app.use() для добавления глобальных middleware функций и передавайте их в конкретные маршруты, чтобы добавлять специфические обработки.
