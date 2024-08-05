// Глава 17: Веб фреймворк Express - Несколько маршрутов в Express в Node.js

// Express - это минималистичный веб-фреймворк для Node.js, который позволяет легко создавать серверные приложения.
// Одной из основных задач Express является создание маршрутов (routes) для обработки различных HTTP-запросов.

// Как работают маршруты в Express:
// В Express маршруты определяются с помощью методов объекта app, таких как app.get, app.post, app.put и app.delete.
// Каждый метод соответствует HTTP-методу и принимает два аргумента: путь маршрута и функцию-обработчик.

// Пример настройки Express-приложения с несколькими маршрутами:
const express = require('express');
const app = express();
const port = 3000;

// Определение маршрута для GET-запросов на корневой путь "/"
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Определение маршрута для GET-запросов на путь "/about"
app.get('/about', (req, res) => {
  res.send('About Us');
});

// Определение маршрута для POST-запросов на путь "/contact"
app.post('/contact', (req, res) => {
  res.send('Contact Us');
});

// Определение маршрута для PUT-запросов на путь "/update"
app.put('/update', (req, res) => {
  res.send('Update Information');
});

// Определение маршрута для DELETE-запросов на путь "/delete"
app.delete('/delete', (req, res) => {
  res.send('Delete Information');
});

// Запуск сервера на указанном порту
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Пример работы с параметрами маршрута:
// Маршруты могут включать параметры, которые начинаются с двоеточия.
// Эти параметры могут быть доступны через req.params в функции-обработчике.

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

// Пример работы с запросами и телом запроса:
// Для обработки данных, отправленных в теле запроса, необходимо использовать промежуточное ПО (middleware) для парсинга тела запроса.

app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  res.send(`Username: ${username}, Password: ${password}`);
});

// Итог:
// Express предоставляет удобные методы для создания маршрутов и обработки различных типов HTTP-запросов.
// С помощью маршрутов можно организовать логику приложения, обрабатывая запросы и отправляя ответы.
// Поддержка параметров маршрута и тела запроса позволяет легко получать и обрабатывать данные из HTTP-запросов.
