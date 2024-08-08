// Глава 20: Создание фронтенд и бекэнд приложения - Подведение итогов по связи фронтенда и бекенда в Node.js

// Связь фронтенда и бекенда является ключевым аспектом веб-разработки.
// В этой главе мы подведем итоги по основным способам связи между фронтендом и бекендом в приложении на Node.js.

// Основные способы связи фронтенда и бекенда:

// 1. HTTP-запросы
// На фронтенде вы можете отправлять HTTP-запросы на сервер с помощью библиотек, таких как Axios или Fetch API.
// Бекенд в Node.js обрабатывает эти запросы и возвращает необходимые данные.
// Пример использования Fetch API для отправки GET-запроса на сервер:
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Пример обработки GET-запроса на сервере с использованием Express.js:
const express = require('express');
const app = express();

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from server' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// 2. Форматы передачи данных
// Для обмена данными между фронтендом и бекендом обычно используются форматы JSON или URL-кодирование.
// JSON является наиболее популярным форматом, так как он легко читаем и широко поддерживается.
// Пример отправки JSON на сервер:
fetch('/api/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John', age: 30 })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Пример обработки POST-запроса на сервере с использованием Express.js:
app.post('/api/submit', (req, res) => {
  const data = req.body;
  console.log(data);
  res.json({ status: 'success' });
});

// 3. Аутентификация и авторизация
// При создании приложений, где требуется аутентификация и авторизация, важно обеспечить безопасный обмен данными.
// Это может включать использование JWT (JSON Web Tokens) или сессий для защиты маршрутов на сервере.
// Пример использования JWT для аутентификации:
const jwt = require('jsonwebtoken');

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Проверка учетных данных...
  const token = jwt.sign({ userId: 1 }, 'your-secret-key');
  res.json({ token });
});

// На фронтенде можно передавать токен в заголовке запроса для доступа к защищенным ресурсам:
fetch('/api/protected', {
  headers: { 'Authorization': `Bearer ${token}` }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// 4. Обработка ошибок
// Важно правильно обрабатывать ошибки как на фронтенде, так и на бекенде.
// Это поможет обеспечить лучший пользовательский опыт и упростить отладку.
// Пример обработки ошибок на сервере:
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Пример обработки ошибок на фронтенде:
fetch('/api/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Итог:
// Связь между фронтендом и бекендом в Node.js осуществляется с помощью HTTP-запросов, форматов передачи данных, аутентификации и обработки ошибок.
// Понимание этих аспектов поможет создать надежное и эффективное веб-приложение.
