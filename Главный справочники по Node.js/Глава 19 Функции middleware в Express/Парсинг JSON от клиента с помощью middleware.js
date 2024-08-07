// Глава 19: Функции middleware в Express - Парсинг JSON от клиента с помощью middleware в Node.js

// В Express.js middleware - это функции, которые выполняются во время обработки HTTP-запросов.
// Middleware могут изменять запрос (req) и ответ (res) объекты, заканчивать обработку запроса или передавать управление следующей функции middleware.

// Парсинг JSON от клиента с помощью middleware:
// Когда клиент отправляет JSON-данные в запросе, нужно обработать и распарсить эти данные, чтобы они были доступны в req.body.
// Для этого в Express.js существует встроенное middleware, которое называется express.json().

// Установка Express:
const express = require('express');
const app = express();
const port = 3000;

// Использование express.json() middleware для парсинга JSON:
// express.json() это встроенное middleware в Express, которое парсит JSON, отправленный в теле запроса, и делает его доступным в req.body.
app.use(express.json());

// Пример маршрута, который принимает JSON-данные от клиента:
app.post('/data', (req, res) => {
  // Данные из тела запроса доступны в req.body благодаря express.json()
  const clientData = req.body;
  console.log('Received JSON data:', clientData);

  // Можно отправить ответ клиенту
  res.send('JSON data received');
});

// Запуск сервера на указанном порту:
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Как это работает:
// 1. Клиент отправляет POST-запрос на /data с JSON-данными в теле запроса.
// 2. express.json() middleware парсит JSON и добавляет его в req.body.
// 3. Маршрут /data обрабатывает запрос, получает данные из req.body и отправляет ответ клиенту.

// Пример запроса с использованием fetch в клиентском JavaScript:
fetch('http://localhost:3000/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ key: 'value' }),
})
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Итог:
// Middleware express.json() в Express.js используется для парсинга JSON-данных, отправленных клиентом в теле запроса.
// Это middleware позволяет легко получать доступ к JSON-данным через req.body, что упрощает обработку запросов и создание API.
