// Глава 12: Модуль http - Разделение кода http сервера на модули в Node.js

// Модуль http в Node.js используется для создания HTTP-серверов.
// Для улучшения читаемости и управления кодом, можно разделить код HTTP-сервера на несколько модулей.
// Это помогает организовать код в более управляемые части и облегчает его сопровождение.

// Создание базового HTTP-сервера:
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000/');
});

// Разделение кода на модули:
// Для разделения кода на модули, можно создать отдельные файлы для обработки маршрутов, контроллеров и других частей логики приложения.

// routes.js - файл для маршрутов:
const handlers = require('./handlers');

const routes = {
  '/': handlers.home,
  '/about': handlers.about,
};

module.exports = routes;

// handlers.js - файл для обработчиков маршрутов:
const handlers = {
  home: (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Welcome to the Home Page\n');
  },
  about: (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('About Us Page\n');
  },
};

module.exports = handlers;

// server.js - основной файл сервера:
const http = require('http');
const routes = require('./routes');

const server = http.createServer((req, res) => {
  if (routes[req.url]) {
    routes[req.url](req, res);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404 Not Found\n');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000/');
});

// Итог:
// Разделение кода HTTP-сервера на модули позволяет улучшить его структуру и управляемость.
// Маршруты, обработчики и основной серверный код можно хранить в отдельных файлах, что делает приложение более масштабируемым и легко поддерживаемым.
