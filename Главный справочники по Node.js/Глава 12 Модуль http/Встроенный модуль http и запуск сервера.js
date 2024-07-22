// Глава 12: Модуль http - Встроенный модуль http и запуск сервера в Node.js

// Node.js предоставляет встроенный модуль http для создания веб-серверов и обработки HTTP-запросов.
// Этот модуль позволяет создавать серверы, которые могут обрабатывать запросы и отправлять ответы клиентам.

// Как работает модуль http:
// Модуль http включает в себя методы и классы для создания сервера, обработки запросов и отправки ответов.
// Основной метод, который используется для создания сервера, это http.createServer().

// Создание простого HTTP-сервера:
// Для создания простого HTTP-сервера, который будет отвечать на все запросы текстом "Hello, World!", можно использовать следующий код:

const http = require('http');

// Создаем сервер
const server = http.createServer((req, res) => {
  // Устанавливаем статус ответа на 200 (OK)
  res.statusCode = 200;
  
  // Устанавливаем заголовок ответа Content-Type
  res.setHeader('Content-Type', 'text/plain');
  
  // Отправляем ответ
  res.end('Hello, World!\n');
});

// Сервер будет слушать запросы на порту 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Обработка различных типов запросов:
// С помощью модуля http можно обрабатывать различные типы HTTP-запросов (GET, POST, PUT, DELETE и т.д.).
// В следующем примере сервер будет обрабатывать GET-запросы к корневому пути '/' и отвечать текстом "Hello, GET!".
// Для других путей и типов запросов будет отправлен ответ "Not Found".

const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, GET!\n');
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found\n');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Итог:
// Встроенный модуль http в Node.js предоставляет все необходимое для создания и запуска веб-серверов.
// Он позволяет обрабатывать различные типы запросов и отправлять ответы клиентам.
// Использование модуля http является основой для создания веб-приложений на Node.js.
