// Глава 12: Модуль http - Разные ответы для разных путей в Node.js

// Модуль http в Node.js используется для создания HTTP-серверов и обработки HTTP-запросов.
// Сервер может отвечать по-разному в зависимости от пути (URL), по которому поступает запрос.

// Как это работает:
// При создании HTTP-сервера, обработчик запросов получает объект запроса (request) и объект ответа (response).
// Объект запроса содержит информацию о пути запроса, которую можно использовать для определения, какой ответ отправить.

// Пример создания HTTP-сервера с разными ответами для разных путей:

const http = require('http');

const server = http.createServer((req, res) => {
  // Извлечение пути запроса
  const path = req.url;

  // Установка заголовков ответа
  res.setHeader('Content-Type', 'text/plain');

  // Обработка запросов по разным путям
  if (path === '/') {
    res.statusCode = 200;
    res.end('Welcome to the Home Page!');
  } else if (path === '/about') {
    res.statusCode = 200;
    res.end('This is the About Page.');
  } else if (path === '/contact') {
    res.statusCode = 200;
    res.end('Contact us at contact@example.com.');
  } else {
    res.statusCode = 404;
    res.end('Page Not Found.');
  }
});

// Запуск сервера на порту 3000
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

// В этом примере:
// - Запросы к корневому пути (/) получают ответ "Welcome to the Home Page!"
// - Запросы к пути /about получают ответ "This is the About Page."
// - Запросы к пути /contact получают ответ "Contact us at contact@example.com."
// - Любые другие пути получают ответ "Page Not Found." с кодом состояния 404

// Итог:
// Использование модуля http в Node.js позволяет создавать серверы, которые могут обрабатывать запросы по разным путям.
// Это обеспечивает гибкость в определении логики обработки запросов и отправки соответствующих ответов.
