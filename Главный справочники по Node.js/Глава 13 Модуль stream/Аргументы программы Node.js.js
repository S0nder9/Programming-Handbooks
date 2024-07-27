// Глава 13: Модуль stream - Аргументы программы Node.js

// В Node.js модуль stream предоставляет абстракцию для работы с потоками данных.
// Потоки используются для обработки потоковых данных, таких как файлы или данные, поступающие по сети, и позволяют работать с данными частями вместо их загрузки целиком.

// Типы потоков в Node.js:
// - Readable (читаемые): используются для чтения данных
// - Writable (записываемые): используются для записи данных
// - Duplex: могут читать и записывать данные
// - Transform: являются разновидностью Duplex, могут изменять или преобразовывать данные при их чтении или записи

// Пример создания и использования Readable и Writable потоков:

const { Readable, Writable } = require('stream');

// Создание читаемого потока
const readableStream = new Readable({
  read(size) {
    this.push('Hello, ');
    this.push('world!');
    this.push(null); // Конец потока
  }
});

// Создание записываемого потока
const writableStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
});

// Подключение читаемого потока к записываемому
readableStream.pipe(writableStream);

// Аргументы программы Node.js:
// При запуске программы Node.js из командной строки можно передавать аргументы.
// Аргументы доступны через объект process.argv, который является массивом, содержащим аргументы командной строки.

// Пример использования аргументов командной строки:
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

// Пример запуска программы:
// node myScript.js arg1 arg2

// Вывод программы:
// 0: /path/to/node
// 1: /path/to/myScript.js
// 2: arg1
// 3: arg2

// Практическое использование аргументов командной строки и потоков:
const fs = require('fs');

// Функция для копирования содержимого файла, имя которого передано в аргументе командной строки
const copyFile = (inputFile, outputFile) => {
  const readableStream = fs.createReadStream(inputFile);
  const writableStream = fs.createWriteStream(outputFile);
  readableStream.pipe(writableStream);

  writableStream.on('finish', () => {
    console.log('File copied successfully');
  });
};

// Проверка аргументов командной строки
if (process.argv.length !== 4) {
  console.log('Usage: node myScript.js <inputFile> <outputFile>');
  process.exit(1);
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];

// Копирование файла
copyFile(inputFile, outputFile);

// Итог:
// Модуль stream в Node.js предоставляет мощные инструменты для работы с потоками данных.
// Аргументы командной строки позволяют передавать данные в программы Node.js при их запуске, что делает их более гибкими и настраиваемыми.
