// Глава 1: Знакомство с Node.js

// Node.js — это платформа для выполнения JavaScript-кода вне браузера. Она позволяет создавать серверные приложения на JavaScript.
// Node.js основан на движке V8, который используется в Google Chrome для интерпретации JavaScript.

// Основные особенности Node.js:
// - Асинхронная и событийно-ориентированная архитектура
// - Неблокирующий ввод-вывод (I/O)
// - Поддержка модулей CommonJS
// - Огромное количество библиотек через npm (Node Package Manager)

// Основные команды для работы с Node.js:

// 1. Установка Node.js и npm
// Для установки Node.js и npm (Node Package Manager) перейдите на официальный сайт Node.js (https://nodejs.org/) и скачайте установочный пакет для вашей операционной системы. Следуйте инструкциям установщика.

// 2. Проверка установки Node.js и npm
// После установки можно проверить версию Node.js и npm с помощью следующих команд в терминале или командной строке:
console.log('Проверка версии Node.js:');
console.log('node -v');

console.log('Проверка версии npm:');
console.log('npm -v');

// 3. Инициализация нового проекта Node.js
// Для создания нового проекта Node.js выполните команду npm init в терминале. Эта команда создаст файл package.json, который содержит информацию о вашем проекте и зависимостях.
console.log('Инициализация нового проекта:');
console.log('npm init');

// 4. Установка пакетов через npm
// Для установки пакета используйте команду npm install (или npm i). Например, для установки пакета express выполните:
console.log('Установка пакета express:');
console.log('npm install express');

// 5. Создание простого сервера на Node.js
// Пример простого HTTP сервера на Node.js с использованием встроенного модуля http:
const http = require('http');

// Создаем сервер, который отвечает "Hello, World!" на любой запрос
const server = http.createServer((req, res) => {
  res.statusCode = 200; // Устанавливаем статус ответа
  res.setHeader('Content-Type', 'text/plain'); // Устанавливаем заголовок ответа
  res.end('Hello, World!\n'); // Отправляем ответ
});

// Сервер будет слушать на порту 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}/`);
});

// 6. Запуск сервера
// Для запуска сервера выполните команду node <имя_файла>. Например, если файл с сервером называется server.js, выполните:
console.log('Запуск сервера:');
console.log('node server.js');

// Итог:
// Node.js предоставляет мощные возможности для создания серверных приложений на JavaScript. Знание основных команд и принципов работы с Node.js является важным для любого разработчика, работающего с этой платформой.
