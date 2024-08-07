// Глава 19: Функции middleware в Express - Парсинг формы от клиента с помощью middleware в Node.js

// Введение:
// Middleware в Express - это функции, которые имеют доступ к объекту запроса (req), объекту ответа (res) и функции next() в цикле запрос-ответ приложения.
// Эти функции могут выполнять различные задачи, такие как парсинг данных запроса, обработка ошибок и многое другое.

// Парсинг формы от клиента с помощью middleware:
// Одной из распространенных задач является парсинг данных формы, отправленных клиентом.
// Для этого часто используется middleware, такое как body-parser или встроенные функции Express.

// Установка body-parser:
// Для начала необходимо установить пакет body-parser:
// npm install body-parser

// Пример использования body-parser для парсинга данных формы:

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Использование body-parser middleware для парсинга application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Обработка POST-запроса с данными формы
app.post('/submit-form', (req, res) => {
  const formData = req.body; // Данные формы будут доступны в req.body
  console.log('Форма отправлена:', formData);
  res.send('Форма успешно обработана');
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

// Пример HTML формы:
// <form action="/submit-form" method="POST">
//   <label for="name">Имя:</label>
//   <input type="text" id="name" name="name">
//   <label for="email">Email:</label>
//   <input type="email" id="email" name="email">
//   <button type="submit">Отправить</button>
// </form>

// В этом примере мы используем body-parser для парсинга данных формы с content-type application/x-www-form-urlencoded.
// Данные формы будут доступны в req.body в маршруте /submit-form.

// Использование встроенного middleware Express для парсинга JSON:
// Если форма отправляется с данными в формате JSON, можно использовать встроенное middleware express.json():

app.use(express.json());

app.post('/submit-json', (req, res) => {
  const jsonData = req.body; // Данные JSON будут доступны в req.body
  console.log('JSON данные отправлены:', jsonData);
  res.send('JSON данные успешно обработаны');
});

// Пример использования fetch для отправки JSON данных:
// fetch('/submit-json', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ name: 'John', email: 'john@example.com' }),
// })
// .then(response => response.text())
// .then(data => console.log(data));

// В этом примере мы используем встроенное middleware express.json() для парсинга данных JSON, отправленных клиентом.

// Итог:
// Middleware функции в Express являются мощным инструментом для обработки и модификации запросов и ответов.
// Использование middleware для парсинга данных формы позволяет легко обрабатывать данные, отправленные клиентом, и интегрировать их в ваше приложение.
