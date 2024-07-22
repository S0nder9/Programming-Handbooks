// Глава 12: Модуль http - Изменение объекта res и тип контента в Node.js

// Модуль http в Node.js предоставляет функциональность для создания HTTP-серверов и обработки запросов.
// Важной частью этого является объект res, который используется для отправки ответа клиенту.
// В этой главе мы рассмотрим, как изменять объект res и устанавливать тип контента для ответа.

// Как работает объект res:
// Объект res (response) представляет собой HTTP-ответ, который сервер отправляет клиенту.
// Он содержит методы и свойства для настройки и отправки ответа.

// Изменение объекта res:
// Чтобы изменить объект res, можно использовать различные методы, такие как res.writeHead, res.write и res.end.

// Пример изменения заголовков и типа контента:
const http = require('http');

const server = http.createServer((req, res) => {
  // Устанавливаем статусный код и заголовки
  res.writeHead(200, {
    'Content-Type': 'text/plain', // Устанавливаем тип контента
    'Custom-Header': 'CustomValue' // Устанавливаем пользовательский заголовок
  });

  // Записываем тело ответа
  res.write('Hello, world!');

  // Завершаем ответ
  res.end();
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Установка различных типов контента:
// В зависимости от типа данных, которые вы хотите отправить, вы можете установить соответствующий Content-Type.

// Пример отправки HTML:
const serverHtml = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<html><body><h1>Hello, world!</h1></body></html>');
  res.end();
});

serverHtml.listen(3001, () => {
  console.log('HTML server is running on http://localhost:3001');
});

// Пример отправки JSON:
const serverJson = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  const responseObject = { message: 'Hello, world!' };
  res.write(JSON.stringify(responseObject));
  res.end();
});

serverJson.listen(3002, () => {
  console.log('JSON server is running on http://localhost:3002');
});

// Пример отправки файла (например, изображения):
const fs = require('fs');
const path = require('path');

const serverImage = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'image.png');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.write('Internal Server Error');
      res.end();
      return;
    }
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(data);
  });
});

serverImage.listen(3003, () => {
  console.log('Image server is running on http://localhost:3003');
});

// Итог:
// Изменение объекта res и установка типа контента являются важными аспектами работы с HTTP-серверами в Node.js.
// Используя методы объекта res, можно настраивать заголовки, отправлять различные типы данных и обеспечивать правильный формат ответа клиенту.
