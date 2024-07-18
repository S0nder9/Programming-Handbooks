// Глава 12: Модуль http - Встроенный модуль http в Node.js

// В Node.js модуль http используется для создания веб-серверов и обработки HTTP-запросов и ответов.
// Модуль http встроен в Node.js, поэтому его не нужно устанавливать отдельно.
// С помощью этого модуля можно создавать серверы, обрабатывать различные виды HTTP-запросов (GET, POST и т.д.), а также отправлять ответы клиентам.

// Основные функции модуля http:
// 1. Создание сервера
// 2. Обработка запросов
// 3. Отправка ответов

// Создание простого HTTP-сервера:
// Для создания HTTP-сервера используется метод createServer модуля http.

const http = require('http');

// Определение обработчика запросов:
const requestHandler = (req, res) => {
  // Установка заголовков ответа:
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // Отправка тела ответа:
  res.end('Hello, World!\n');
};

// Создание сервера:
const server = http.createServer(requestHandler);

// Запуск сервера на порту 3000:
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Пример более сложного обработчика запросов:
// Обработка различных маршрутов и методов запросов.

const requestHandler = (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the homepage!\n');
  } else if (req.method === 'GET' && req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is the about page.\n');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found.\n');
  }
};

// Создание и запуск сервера с новым обработчиком:
const server = http.createServer(requestHandler);
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Обработка POST-запросов:
// Для обработки POST-запросов нужно считывать данные из тела запроса.

const requestHandler = (req, res) => {
  if (req.method === 'POST' && req.url === '/data') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ receivedData: body }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found.\n');
  }
};

// Создание и запуск сервера для обработки POST-запросов:
const server = http.createServer(requestHandler);
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Итог:
// Модуль http в Node.js позволяет создавать мощные и гибкие веб-серверы.
// С его помощью можно обрабатывать различные виды HTTP-запросов и отправлять ответы клиентам.
// Это делает его основным инструментом для создания веб-приложений и API в Node.js.
