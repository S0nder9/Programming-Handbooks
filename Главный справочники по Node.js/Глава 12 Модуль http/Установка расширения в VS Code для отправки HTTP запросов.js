// Глава 12: Модуль http - Установка расширения в VS Code для отправки HTTP запросов в Node.js

// В Node.js модуль http используется для создания HTTP-серверов и обработки запросов.
// Для отправки HTTP-запросов во время разработки можно использовать различные инструменты, такие как расширения для Visual Studio Code (VS Code).
// Одним из таких расширений является "REST Client", которое позволяет отправлять HTTP-запросы прямо из VS Code.

// Шаги по установке и использованию REST Client:

// 1. Установка расширения:
//    - Откройте VS Code.
//    - Перейдите на вкладку Extensions (значок квадратного пазла на боковой панели).
//    - В строке поиска введите "REST Client".
//    - Найдите расширение "REST Client" от Huachao Mao и нажмите "Install" для установки.

// 2. Создание HTTP-запроса:
//    - Создайте новый файл с расширением .http или .rest, например, requests.http.
//    - В этом файле можно писать HTTP-запросы. Вот пример запроса GET:

// requests.http
GET http://localhost:3000

// 3. Отправка HTTP-запроса:
//    - После написания запроса наведите курсор на строку с запросом.
//    - Появится кнопка "Send Request". Нажмите на нее, чтобы отправить запрос.
//    - Ответ будет отображен в отдельной панели внутри VS Code.

// Пример использования модуля http в Node.js для создания сервера:

const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, world!\n');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// Теперь вы можете использовать REST Client для отправки HTTP-запроса на сервер, запущенный на localhost:3000.

// Пример запроса POST с телом запроса:

// requests.http
POST http://localhost:3000
Content-Type: application/json

{
  "message": "Hello, server!"
}

// Пример обработки POST-запроса в Node.js:

const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      console.log('Received body:', body);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ received: true }));
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// Итог:
// Модуль http в Node.js позволяет создавать HTTP-серверы и обрабатывать запросы.
// Расширение REST Client в VS Code позволяет отправлять HTTP-запросы непосредственно из редактора, что упрощает тестирование и разработку.
