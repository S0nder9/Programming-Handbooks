// Глава 17: Веб фреймворк Express - Переход с http на Express в Node.js

// Express - это популярный веб-фреймворк для Node.js, который упрощает создание и управление серверными приложениями.
// Он предоставляет мощные функции для маршрутизации, промежуточного ПО и обработки запросов/ответов.

// В этой главе мы рассмотрим, как перейти с использования стандартного модуля http на использование Express в Node.js.

// Использование http в Node.js:
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, world!');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

// Переход на Express:
// Сначала необходимо установить Express с помощью npm:
// npm install express

// Затем можно переписать код сервера, используя Express:
const express = require('express');
const app = express();

// Маршрут для главной страницы
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Обработка 404 ошибки
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

// Преимущества использования Express:
// - Простая маршрутизация: Express предоставляет удобный API для создания маршрутов.
// - Поддержка промежуточного ПО: Express позволяет легко добавлять промежуточное ПО для обработки запросов и ответов.
// - Обширная экосистема: Express имеет большое количество сторонних пакетов и модулей, которые можно использовать для расширения функциональности.

// Пример добавления промежуточного ПО:
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Передает управление следующему обработчику
});

// Пример создания маршрутов с параметрами:
app.get('/user/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

// Итог:
// Переход с http на Express в Node.js значительно упрощает разработку серверных приложений.
// Express предлагает множество функций для управления маршрутами, промежуточным ПО и обработки запросов/ответов, делая код более чистым и читаемым.
