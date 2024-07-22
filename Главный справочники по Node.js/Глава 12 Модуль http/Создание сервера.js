// Глава 12: Модуль http - Создание сервера в Node.js

// В Node.js модуль http используется для создания веб-серверов и обработки HTTP-запросов.
// Это основной модуль, который предоставляет функционал для работы с протоколом HTTP.

// Как работает модуль http:
// Модуль http предоставляет методы для создания сервера и обработки запросов и ответов.
// Основные функции модуля http включают создание сервера, обработку входящих запросов и отправку ответов.

// Создание простого HTTP-сервера:
// 1. Импортируем модуль http.
const http = require('http');

// 2. Создаем сервер, используя метод createServer.
const server = http.createServer((req, res) => {
  // Устанавливаем заголовок ответа.
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // Отправляем ответ.
  res.end('Hello, World!\n');
});

// 3. Сервер прослушивает запросы на определенном порту.
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Пример расширенного HTTP-сервера:
// Создадим сервер, который будет обрабатывать различные маршруты и методы запросов.
const http = require('http');

// Обработчик для маршрутов.
const requestHandler = (req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Welcome to the Homepage</h1>');
  } else if (method === 'GET' && url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>About Us</h1>');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
};

// Создаем сервер с использованием обработчика запросов.
const server = http.createServer(requestHandler);

// Сервер прослушивает запросы на определенном порту.
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Итог:
// Модуль http в Node.js предоставляет мощные возможности для создания веб-серверов и обработки HTTP-запросов.
// С помощью этого модуля можно создать как простые, так и сложные серверные приложения, обрабатывающие различные маршруты и методы запросов.
