// Глава 20: Создание фронтенд и бекэнд приложения - Отображение данных в интерфейсе в Node.js

// Для создания приложения с фронтендом и бекэндом в Node.js, нужно настроить как серверную, так и клиентскую части.
// В этой главе мы рассмотрим, как отображать данные в интерфейсе, используя Node.js для серверной части и обычный HTML/JavaScript для клиентской части.

// Шаг 1: Настройка серверной части
// Используем Express.js для создания простого сервера, который будет предоставлять данные клиенту.

const express = require('express');
const app = express();
const port = 3000;

// Пример данных, которые мы будем предоставлять клиенту
const data = [
  { id: 1, name: 'Item 1', description: 'This is item 1' },
  { id: 2, name: 'Item 2', description: 'This is item 2' },
  { id: 3, name: 'Item 3', description: 'This is item 3' }
];

// Маршрут для получения данных
app.get('/api/data', (req, res) => {
  res.json(data);
});

// Статические файлы для клиентской части
app.use(express.static('public'));

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Шаг 2: Создание клиентской части
// Для отображения данных на клиенте создаем HTML-файл и JavaScript для загрузки данных с сервера и отображения их в интерфейсе.

// public/index.html
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Data Display</title>
// </head>
// <body>
//   <h1>Data List</h1>
//   <ul id="data-list"></ul>
//   <script src="script.js"></script>
// </body>
// </html>

// public/script.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/data')
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById('data-list');
      data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name}: ${item.description}`;
        list.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});

// Итог:
// Мы создали простой сервер на Express.js, который предоставляет данные через API.
// На клиенте мы загрузили эти данные и отобразили их в списке на веб-странице.
// Этот подход позволяет создать полноценное приложение с фронтендом и бекэндом, где данные могут передаваться и отображаться динамически.
