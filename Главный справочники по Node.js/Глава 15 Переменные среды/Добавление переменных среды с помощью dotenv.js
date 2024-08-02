// Глава 15: Переменные среды - Добавление переменных среды с помощью dotenv в Node.js

// Переменные среды используются для хранения конфиденциальных данных или настроек, которые могут изменяться в зависимости от окружения (например, development, production).
// В Node.js для управления переменными среды часто используется пакет dotenv.

// Установка dotenv:
// Для начала нужно установить пакет dotenv с помощью npm:
npm install dotenv

// Использование dotenv:
// Создайте файл .env в корневой директории вашего проекта. Этот файл будет содержать переменные среды в формате ключ-значение.
PORT=3000
DATABASE_URL=mongodb://localhost:27017/mydatabase

// Затем подключите и настройте dotenv в вашем приложении. Это обычно делается в самом начале вашего основного файла (например, app.js):
require('dotenv').config();

// Теперь вы можете получить доступ к переменным среды через объект process.env:
const express = require('express');
const app = express();

const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Connected to database at ${databaseUrl}`);
});

// Безопасность и Git:
// Важно не включать файл .env в систему контроля версий (например, Git), так как он может содержать конфиденциальную информацию.
// Добавьте .env в ваш .gitignore файл:
.env

// Пример .env файла:
PORT=3000
DATABASE_URL=mongodb://localhost:27017/mydatabase
SECRET_KEY=your_secret_key

// Итог:
// Пакет dotenv упрощает управление переменными среды в Node.js приложениях.
// Используйте файл .env для хранения конфиденциальных данных и легко получайте к ним доступ через process.env.
// Не забывайте добавлять .env в .gitignore для защиты ваших данных.
