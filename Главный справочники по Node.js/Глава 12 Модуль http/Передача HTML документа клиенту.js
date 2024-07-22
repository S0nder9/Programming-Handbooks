// Глава 12: Модуль http - Передача HTML документа клиенту при помощи fs в Node.js

// В Node.js модуль http используется для создания веб-серверов и обработки HTTP-запросов.
// В этом разделе мы рассмотрим, как передать HTML-документ клиенту, используя модули http и fs.

// Как это работает:
// Мы создаем сервер HTTP, который обрабатывает запросы от клиента.
// Для отправки HTML-документа мы читаем файл с помощью модуля fs и передаем его содержимое в ответе.

// Пример создания HTTP-сервера и отправки HTML-документа:

const http = require('http'); // Импортируем модуль http
const fs = require('fs'); // Импортируем модуль fs
const path = require('path'); // Импортируем модуль path для работы с путями файлов

// Создаем HTTP-сервер
const server = http.createServer((req, res) => {
  // Устанавливаем путь к HTML-файлу
  const filePath = path.join(__dirname, 'index.html');

  // Читаем HTML-файл с помощью fs
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // Обрабатываем ошибки при чтении файла
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error reading file');
      return;
    }

    // Устанавливаем заголовки ответа и передаем HTML-документ
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

// Запускаем сервер на порту 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Итог:
// Используя модули http и fs, мы можем создать сервер, который отправляет HTML-документ клиенту.
// Модуль fs позволяет читать содержимое файла, а модуль http - обрабатывать HTTP-запросы и отправлять ответы.
