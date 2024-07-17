// Глава 8: Встроенные модули в Node.js - документация в NodeJS

// Встроенные модули в Node.js предоставляют множество полезных функций и утилит, которые помогают разработчикам 
// создавать серверные приложения, работать с файлами, сетевыми запросами и многим другим.
// Эти модули встроены в саму среду выполнения Node.js, и их можно использовать без необходимости установки дополнительных пакетов.

// Как использовать встроенные модули:
// Чтобы использовать встроенный модуль в Node.js, его нужно импортировать с помощью функции require.
// Рассмотрим несколько примеров использования встроенных модулей.

// Пример использования модуля 'fs' (файловая система):
const fs = require('fs');

// Чтение файла асинхронно
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});

// Запись в файл асинхронно
fs.writeFile('example.txt', 'Hello, world!', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('File written successfully');
});

// Пример использования модуля 'http' (создание HTTP сервера):
const http = require('http');

// Создание сервера
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, world!\n');
});

// Запуск сервера на порту 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3000/');
});

// Пример использования модуля 'path' (работа с путями файлов):
const path = require('path');

// Получение базового имени файла
const basename = path.basename('/path/to/file.txt');
console.log('Basename:', basename); // Выведет: file.txt

// Получение директории файла
const dirname = path.dirname('/path/to/file.txt');
console.log('Dirname:', dirname); // Выведет: /path/to

// Соединение путей
const joinedPath = path.join('/path', 'to', 'file.txt');
console.log('Joined Path:', joinedPath); // Выведет: /path/to/file.txt

// Пример использования модуля 'os' (информация о системе):
const os = require('os');

// Получение информации о платформе
const platform = os.platform();
console.log('Platform:', platform); // Выведет текущую платформу, например: darwin, win32, linux

// Получение информации о памяти
const freeMemory = os.freemem();
const totalMemory = os.totalmem();
console.log('Free Memory:', freeMemory);
console.log('Total Memory:', totalMemory);

// Итог:
// Встроенные модули в Node.js предоставляют широкий спектр функциональных возможностей для решения различных задач.
// Они позволяют работать с файлами, создавать серверы, обрабатывать пути файлов, получать информацию о системе и многое другое.
// Документация по встроенным модулям доступна на официальном сайте Node.js и является отличным ресурсом для изучения их возможностей и использования в проектах.
