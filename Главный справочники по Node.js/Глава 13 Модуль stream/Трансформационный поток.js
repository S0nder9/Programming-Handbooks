// Глава 13: Модуль stream - Трансформационный поток в Node.js

// Модуль stream в Node.js предоставляет интерфейсы для работы с потоками данных.
// Потоки позволяют работать с данными постепенно, вместо того чтобы загружать их целиком в память.
// Трансформационные потоки (Transform Streams) - это тип потока, который может изменять данные, проходящие через него.

// Как работают трансформационные потоки:
// Трансформационный поток сочетает в себе возможности как читаемого, так и записываемого потока.
// Он может получать данные, изменять их и затем передавать их дальше.

// Создание трансформационного потока:
// Для создания трансформационного потока в Node.js используется класс Transform из модуля stream.
// Необходимо переопределить метод _transform, который будет вызываться для каждого фрагмента данных.

const { Transform } = require('stream');

class UpperCaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    // Преобразуем данные в верхний регистр
    const upperCaseChunk = chunk.toString().toUpperCase();
    // Передаем преобразованные данные дальше
    this.push(upperCaseChunk);
    // Сообщаем, что преобразование завершено
    callback();
  }
}

// Использование трансформационного потока:
const upperCaseTransform = new UpperCaseTransform();

process.stdin.pipe(upperCaseTransform).pipe(process.stdout);

// В этом примере данные, введенные с клавиатуры (stdin), будут преобразованы в верхний регистр и выведены в консоль (stdout).

// Пример более сложного трансформационного потока:
const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream');

class ReplaceTransform extends Transform {
  constructor(searchString, replaceString) {
    super();
    this.searchString = searchString;
    this.replaceString = replaceString;
  }

  _transform(chunk, encoding, callback) {
    const transformedChunk = chunk.toString().replace(this.searchString, this.replaceString);
    this.push(transformedChunk);
    callback();
  }
}

const replaceTransform = new ReplaceTransform('old', 'new');

pipeline(
  createReadStream('input.txt'),
  replaceTransform,
  createWriteStream('output.txt'),
  (err) => {
    if (err) {
      console.error('Pipeline failed:', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);

// В этом примере содержимое файла input.txt будет обработано трансформационным потоком, заменяющим все вхождения строки 'old' на 'new', и результат будет записан в файл output.txt.

// Итог:
// Трансформационные потоки в Node.js позволяют изменять данные на лету, проходя через поток.
// Это полезно для обработки больших объемов данных, таких как файлы или сетевые потоки, без необходимости загружать их целиком в память.
