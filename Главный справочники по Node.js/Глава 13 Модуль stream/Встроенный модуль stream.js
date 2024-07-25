// Глава 13: Модуль stream - Встроенный модуль stream в Node.js

// Модуль stream в Node.js предоставляет интерфейсы для работы с потоками данных.
// Потоки позволяют обрабатывать данные по мере их поступления, что особенно полезно при работе с большими объемами данных или сетевыми операциями.

// Типы потоков:
// 1. Readable (читаемые потоки): Позволяют читать данные по частям.
// 2. Writable (записываемые потоки): Позволяют записывать данные по частям.
// 3. Duplex (дуплексные потоки): Комбинируют возможности чтения и записи.
// 4. Transform (трансформирующие потоки): Преобразуют данные по мере их чтения или записи.

// Пример использования читаемого потока:
const fs = require('fs');
const readableStream = fs.createReadStream('example.txt', { encoding: 'utf8' });

readableStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk);
});

readableStream.on('end', () => {
  console.log('No more data.');
});

// Пример использования записываемого потока:
const writableStream = fs.createWriteStream('output.txt');

writableStream.write('Hello, ');
writableStream.write('world!');
writableStream.end();

writableStream.on('finish', () => {
  console.log('All data has been written.');
});

// Пример использования дуплексного потока:
const { Duplex } = require('stream');

class MyDuplex extends Duplex {
  constructor(options) {
    super(options);
    this.data = [];
  }

  _write(chunk, encoding, callback) {
    this.data.push(chunk);
    callback();
  }

  _read(size) {
    if (this.data.length > 0) {
      this.push(this.data.shift());
    } else {
      this.push(null);
    }
  }
}

const myDuplex = new MyDuplex();

myDuplex.on('data', (chunk) => {
  console.log('Read chunk:', chunk.toString());
});

myDuplex.write('Hello, ');
myDuplex.write('Duplex!');
myDuplex.end();

// Пример использования трансформирующего потока:
const { Transform } = require('stream');

class MyTransform extends Transform {
  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}

const myTransform = new MyTransform();

myTransform.on('data', (chunk) => {
  console.log('Transformed chunk:', chunk.toString());
});

myTransform.write('Hello, ');
myTransform.write('Transform!');
myTransform.end();

// Итог:
// Модуль stream в Node.js предоставляет мощные и гибкие средства для работы с потоками данных.
// Использование потоков позволяет обрабатывать данные эффективно и по мере их поступления,
// что делает их идеальным выбором для работы с большими объемами данных и сетевыми операциями.
