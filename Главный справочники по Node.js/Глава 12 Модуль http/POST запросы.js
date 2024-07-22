// Глава 12: Модуль http - POST запросы в Node.js

// Модуль http в Node.js позволяет создавать веб-серверы и обрабатывать HTTP-запросы, включая POST-запросы.
// POST-запросы используются для отправки данных на сервер, обычно для создания или обновления ресурсов.

// Создание сервера для обработки POST-запросов:
// В Node.js можно использовать модуль http для создания простого веб-сервера.

const http = require('http');

const server = http.createServer((req, res) => {
  // Устанавливаем заголовки ответа для CORS и Content-Type
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    // Обрабатываем preflight запросы CORS
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST') {
    let body = '';

    // Читаем данные из запроса
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Обработка полного запроса
    req.on('end', () => {
      try {
        const parsedData = JSON.parse(body);
        console.log('Received data:', parsedData);

        // Формируем ответ
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Data received successfully', data: parsedData }));
      } catch (error) {
        // Обработка ошибки парсинга JSON
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    // Ответ для запросов, отличных от POST
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
  }
});

// Запуск сервера на порту 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// Отправка POST-запроса к серверу:
// Для отправки POST-запроса к серверу можно использовать различные инструменты, такие как curl, Postman, или встроенные методы в Node.js.

// Пример использования fetch для отправки POST-запроса:

const fetch = require('node-fetch');

const postData = async () => {
  const response = await fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'John', age: 30 }),
  });

  const data = await response.json();
  console.log('Response from server:', data);
};

postData();

// Итог:
// Модуль http в Node.js позволяет создавать серверы и обрабатывать POST-запросы.
// POST-запросы используются для отправки данных на сервер, и Node.js предоставляет простой способ обработки этих данных и отправки ответа клиенту.
