// Глава 17: Веб фреймворк Express - Создание веб сервера без Express в Node.js

// В Node.js можно создать веб-сервер без использования фреймворка Express.
// Для этого используется встроенный модуль 'http'.
// Это дает возможность полностью контролировать процесс создания и настройки сервера.

// Пример создания простого веб-сервера без использования Express:

const http = require('http');

// Создаем сервер, используя метод http.createServer
const server = http.createServer((req, res) => {
  // Устанавливаем заголовки ответа
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Определяем маршрут по умолчанию
  if (req.url === '/') {
    res.write('Hello, World!');
  } else if (req.url === '/about') {
    res.write('About Us');
  } else {
    res.write('Page Not Found');
  }

  // Завершаем ответ
  res.end();
});

// Определяем порт, на котором сервер будет прослушивать запросы
const PORT = 3000;

// Запускаем сервер и выводим сообщение в консоль
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Обработка POST-запросов
server.on('request', (req, res) => {
  if (req.method === 'POST' && req.url === '/submit') {
    let body = '';

    // Чтение данных из тела запроса
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Обработка данных после завершения чтения
    req.on('end', () => {
      console.log('Received data:', body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Data received successfully' }));
    });
  }
});

// Итог:
// Создание веб-сервера без использования Express предоставляет полный контроль над сервером и его маршрутами.
// Это полезно для изучения основ работы с HTTP-серверами и понимания, как работают веб-серверы в Node.js.
// Тем не менее, для более сложных приложений использование фреймворка Express может значительно упростить разработку.
