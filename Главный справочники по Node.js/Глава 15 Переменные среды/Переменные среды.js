// Глава 15: Переменные среды - Переменные среды в Node.js

// Переменные среды в Node.js используются для хранения конфигурационных значений, которые могут изменяться в зависимости от окружения (например, разработка, тестирование, производство).
// Они обеспечивают гибкость и безопасность при управлении конфигурациями приложения.

// Как работают переменные среды:
// Переменные среды могут быть определены в операционной системе и доступны для Node.js-приложений через объект process.env.
// process.env является объектом, содержащим все переменные среды текущего процесса.

// Пример использования переменных среды:
// Допустим, у нас есть файл .env, содержащий переменные среды:
// .env
// PORT=3000
// DATABASE_URL=mongodb://localhost:27017/mydatabase

// Для использования этих переменных в Node.js-приложении, можно воспользоваться библиотекой dotenv, которая загружает переменные среды из файла .env в process.env.

// Установка библиотеки dotenv:
// npm install dotenv

// Пример использования переменных среды в приложении:
require('dotenv').config(); // Загружаем переменные среды из .env файла

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Используем переменные среды
const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL;

mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Итог:
// Переменные среды обеспечивают гибкость и безопасность при управлении конфигурациями приложения.
// Они позволяют хранить конфиденциальные данные вне исходного кода и легко менять настройки в зависимости от окружения.
