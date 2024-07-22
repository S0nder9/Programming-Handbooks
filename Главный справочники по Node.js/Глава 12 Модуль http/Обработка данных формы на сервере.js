// Глава 12: Модуль http - Обработка данных формы на сервере в Node.js

// Модуль http в Node.js используется для создания серверов и обработки HTTP-запросов и ответов.
// Одним из распространенных случаев использования является обработка данных формы, отправленных клиентом.

// Как работает обработка данных формы:
// Когда клиент отправляет форму на сервер, данные передаются в теле запроса.
// Сервер может прочитать и обработать эти данные, используя методы и события модуля http.

// Пример создания сервера и обработки данных формы:

const http = require('http');
const querystring = require('querystring');

// Создаем сервер
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/submit-form') {
    let body = '';

    // Собираем данные из тела запроса
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Обрабатываем данные после получения всего тела запроса
    req.on('end', () => {
      // Парсим данные формы
      const parsedData = querystring.parse(body);
      console.log('Received form data:', parsedData);

      // Отправляем ответ клиенту
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Form data received and processed');
    });

  } else {
    // Отправляем ответ по умолчанию
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <form method="POST" action="/submit-form">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <button type="submit">Submit</button>
      </form>
    `);
  }
});

// Запускаем сервер на порту 3000
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// В этом примере мы создаем сервер, который обрабатывает POST-запросы на URL /submit-form.
// Мы собираем данные из тела запроса, парсим их и выводим в консоль.
// Затем отправляем ответ клиенту, подтверждая получение данных формы.

// Итог:
// Модуль http в Node.js предоставляет удобные средства для создания серверов и обработки данных формы.
// Используйте методы и события для чтения и обработки данных из тела запроса, чтобы обеспечить взаимодействие с клиентом.
