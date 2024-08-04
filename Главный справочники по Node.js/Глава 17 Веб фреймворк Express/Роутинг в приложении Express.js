// Глава 17: Веб фреймворк Express - Роутинг в приложении Express в Node.js

// Веб-фреймворк Express предоставляет мощные возможности для создания серверных приложений на Node.js.
// Одной из ключевых функций Express является роутинг, который позволяет определять, как приложение будет обрабатывать запросы к различным URL.

// Как работает роутинг в Express:
// Роутинг в Express - это процесс определения, какой код будет выполнен при обращении к определенному URL.
// Express использует методы для определения маршрутов, такие как get(), post(), put(), delete() и другие, чтобы обработать различные HTTP-запросы.

// Пример простого роутинга:
const express = require('express');
const app = express();

// Определение маршрута для GET-запроса к корневому URL
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Определение маршрута для GET-запроса к /about
app.get('/about', (req, res) => {
  res.send('About us page');
});

// Определение маршрута для POST-запроса к /submit
app.post('/submit', (req, res) => {
  res.send('Form submitted');
});

// Использование параметров маршрута:
// Параметры маршрута позволяют захватывать значения из URL и использовать их в обработчике маршрута.
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

// Использование маршрутов с несколькими методами:
// Один и тот же маршрут может обрабатывать различные HTTP-методы.
app.route('/book')
  .get((req, res) => {
    res.send('Get a random book');
  })
  .post((req, res) => {
    res.send('Add a book');
  })
  .put((req, res) => {
    res.send('Update the book');
  });

// Использование middleware для маршрутов:
// Middleware - это функции, которые могут обрабатывать запросы перед тем, как они попадут в конечный обработчик маршрута.
const logMiddleware = (req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next(); // Передаем управление следующей функции
};

app.use(logMiddleware);

// Определение маршрута с использованием middleware
app.get('/middleware', (req, res) => {
  res.send('Middleware example');
});

// Запуск сервера:
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Итог:
// Роутинг в Express является мощным инструментом для обработки HTTP-запросов и определения, какой код будет выполнен в ответ на определенные URL.
// Используйте различные методы маршрутов и middleware для создания гибких и мощных серверных приложений.
