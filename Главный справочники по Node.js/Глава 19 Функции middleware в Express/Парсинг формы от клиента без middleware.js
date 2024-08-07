// Глава 19: Функции middleware в Express - Парсинг формы от клиента без middleware в Node.js

// В приложениях Node.js часто возникает необходимость обрабатывать данные формы, отправленные клиентом.
// В отличие от использования middleware в Express, данные формы можно парсить вручную, используя встроенные модули Node.js.
// В этом примере мы рассмотрим, как парсить данные формы от клиента без использования middleware в чистом Node.js.

// Шаг 1: Создание простого сервера на Node.js
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // Отправляем HTML форму клиенту
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <form method="POST" action="/submit">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"><br>
        <label for="age">Age:</label>
        <input type="text" id="age" name="age"><br>
        <input type="submit" value="Submit">
      </form>
    `);
  } else if (req.method === 'POST' && req.url === '/submit') {
    let body = '';

    // Слушаем событие 'data' для получения данных формы
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Слушаем событие 'end' для завершения парсинга данных формы
    req.on('end', () => {
      const parsedData = querystring.parse(body);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <h1>Form Data Received</h1>
        <p>Name: ${parsedData.name}</p>
        <p>Age: ${parsedData.age}</p>
      `);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

// Объяснение:
// 1. Создаем сервер на Node.js с помощью модуля 'http'.
// 2. Обрабатываем GET запрос к корневому URL ('/') и отправляем HTML форму клиенту.
// 3. Обрабатываем POST запрос к URL '/submit'.
// 4. Слушаем события 'data' и 'end' для получения и парсинга данных формы, отправленных клиентом.
// 5. Используем модуль 'querystring' для преобразования строки запроса в объект JavaScript.

// Итог:
// Парсинг формы от клиента без использования middleware в Node.js возможен с использованием встроенных модулей 'http' и 'querystring'.
// Этот подход подходит для простых приложений или случаев, когда не требуется полный функционал, предоставляемый Express и его middleware.
