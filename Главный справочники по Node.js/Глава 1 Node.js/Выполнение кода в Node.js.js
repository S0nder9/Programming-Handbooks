// Глава 1: Node.js - Выполнение кода в Node.js

// Node.js — это среда выполнения JavaScript-кода на серверной стороне. Она построена на движке V8 от Google, который используется в браузере Chrome, и позволяет выполнять JavaScript-код вне браузера.

// Основные особенности Node.js:
// 1. Однопоточная модель с циклом событий (Event Loop).
// 2. Асинхронное выполнение кода.
// 3. Работа с файлами и сетью.

// Подглава 1.1: Установка и настройка Node.js
// 1. Установка Node.js: скачайте и установите Node.js с официального сайта https://nodejs.org.
// 2. Проверка установки: используйте команды `node -v` и `npm -v` для проверки установки Node.js и npm (менеджер пакетов Node.js).

// Пример кода для проверки версии Node.js и npm:
console.log(`Node.js version: ${process.version}`);
console.log(`npm version: ${require('child_process').execSync('npm -v').toString().trim()}`);

// Подглава 1.2: Выполнение простого скрипта в Node.js
// Создайте файл с именем `app.js` и напишите в нем простой код:

// app.js
console.log('Hello, Node.js!');

// Для выполнения этого скрипта используйте команду в терминале:
 // node app.js

// Подглава 1.3: Модули и require()
// Node.js поддерживает модульную систему CommonJS, которая позволяет организовывать код в отдельные файлы и повторно использовать их. Для этого используются функции require() и module.exports.

// Пример создания и использования модуля:
// В файле `math.js` определим простую функцию сложения:
 
// math.js
function add(a, b) {
  return a + b;
}
module.exports = { add };

// В файле `app.js` используем модуль `math.js`:
 
// app.js
const math = require('./math');
const result = math.add(2, 3);
console.log(`2 + 3 = ${result}`);

// Подглава 1.4: Асинхронное выполнение кода
// Node.js использует асинхронную модель ввода-вывода, что позволяет обрабатывать большое количество запросов без блокировки основного потока. Для работы с асинхронным кодом часто используются колбэки, промисы и async/await.

// Пример асинхронного чтения файла с использованием колбэков:
// Создайте файл `file.txt` с произвольным текстом и выполните следующий код:

const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Ошибка чтения файла:', err);
    return;
  }
  console.log('Содержимое файла:', data);
});

// Пример асинхронного чтения файла с использованием промисов и async/await:
const fsPromises = require('fs').promises;

async function readFileAsync() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log('Содержимое файла:', data);
  } catch (err) {
    console.error('Ошибка чтения файла:', err);
  }
}

readFileAsync();

// Подглава 1.5: Работа с событиями и EventEmitter
// Node.js включает встроенный модуль `events`, который позволяет работать с событиями. Вы можете создавать собственные объекты событий и обрабатывать их с помощью EventEmitter.

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Подписываемся на событие
myEmitter.on('event', () => {
  console.log('Событие произошло!');
});

// Инициализируем событие
myEmitter.emit('event');

// Подглава 1.6: Работа с HTTP сервером
// Node.js позволяет создавать HTTP серверы для обработки веб-запросов. Для этого используется встроенный модуль `http`.

const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

const port = 3000;
server.listen(port, () => {
  console.log(`Сервер запущен по адресу http://localhost:${port}/`);
});

// Теперь при открытии http://localhost:3000/ в браузере вы увидите сообщение "Hello, World!".

// Итог:
// Node.js предоставляет мощные возможности для выполнения JavaScript-кода на серверной стороне. 
// Благодаря своей асинхронной модели и поддержке модулей, Node.js подходит для создания высокопроизводительных серверных приложений.
