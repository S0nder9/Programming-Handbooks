// Глава 12: Модуль http - Проверка типа контента в запросе клиента в Node.js

// Модуль http в Node.js позволяет создавать веб-серверы и обрабатывать HTTP-запросы.
// Одной из задач при обработке запросов является проверка типа контента (Content-Type), который отправляет клиент.
// Это важно, так как разные типы контента требуют разного подхода к обработке.

// Как работает проверка типа контента:
// HTTP-запрос содержит заголовки, один из которых - Content-Type, указывает тип данных, отправляемых в запросе.
// Сервер может проверить этот заголовок и принять решение о дальнейшей обработке данных.

// Пример создания HTTP-сервера и проверки типа контента:
const http = require('http');

const server = http.createServer((req, res) => {
  // Получаем значение заголовка Content-Type
  const contentType = req.headers['content-type'];

  // Проверяем тип контента
  if (contentType === 'application/json') {
    let body = '';

    // Читаем данные из тела запроса
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Обрабатываем данные после завершения получения
    req.on('end', () => {
      try {
        // Парсим JSON-данные
        const jsonData = JSON.parse(body);
        console.log('Received JSON data:', jsonData);

        // Отправляем ответ клиенту
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Data received and processed' }));
      } catch (error) {
        // Обрабатываем ошибку парсинга JSON
        console.error('Invalid JSON data:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    // Обрабатываем неподдерживаемый тип контента
    res.writeHead(415, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Unsupported Content-Type' }));
  }
});

// Сервер прослушивает запросы на порту 3000
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// Итог:
// Проверка типа контента в HTTP-запросах позволяет серверу корректно обрабатывать данные в зависимости от их типа.
// В данном примере сервер обрабатывает JSON-данные и отправляет соответствующие ответы в зависимости от результата обработки.
