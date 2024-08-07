// Глава 19: Функции middleware в Express - Парсинг JSON от клиента без middleware в Node.js

// В веб-приложениях на Node.js и Express часто возникает необходимость обработки JSON-данных, отправленных клиентом.
// Обычно для этого используются middleware-функции, такие как express.json(), которая автоматически парсит JSON.
// Однако, можно выполнить парсинг JSON вручную без использования middleware.

const http = require('http');

// Создаем HTTP-сервер
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.headers['content-type'] === 'application/json') {
    let body = '';

    // Читаем данные, поступающие от клиента
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Обрабатываем завершение получения данных
    req.on('end', () => {
      try {
        // Парсим JSON-данные
        const parsedData = JSON.parse(body);

        // Обрабатываем полученные данные
        console.log('Received JSON:', parsedData);

        // Отправляем ответ клиенту
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Data received successfully', data: parsedData }));
      } catch (error) {
        // Обрабатываем ошибки парсинга JSON
        console.error('Error parsing JSON:', error);

        // Отправляем ошибку клиенту
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    // Обрабатываем неподдерживаемые запросы
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Запускаем сервер на порту 3000
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// Пример отправки POST-запроса с JSON-данными с помощью fetch API в браузере:
// fetch('http://localhost:3000', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({ name: 'John', age: 30 })
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error('Error:', error));

// Итог:
// В данном примере показано, как вручную парсить JSON-данные, отправленные клиентом, без использования middleware в Node.js.
// Это полезно для понимания низкоуровневой обработки данных и может быть полезно в ситуациях, когда необходимо полное управление процессом парсинга JSON.
