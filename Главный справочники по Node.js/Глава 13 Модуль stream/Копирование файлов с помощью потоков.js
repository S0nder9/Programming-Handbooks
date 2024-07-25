// Глава 13: Модуль stream - Копирование файлов с помощью потоков в Node.js

// Модуль stream в Node.js используется для обработки потоков данных, которые могут быть прочитаны или записаны асинхронно.
// Потоки представляют собой интерфейс для работы с потоковыми данными, такими как файлы или сетевые соединения.
// В этом разделе мы рассмотрим, как использовать потоки для копирования файлов.

// Как работают потоки:
// Потоки в Node.js бывают четырех типов: Readable, Writable, Duplex и Transform.
// Для копирования файлов мы будем использовать Readable и Writable потоки.
// Readable поток читает данные из источника, такого как файл, и передает их Writable потоку, который записывает данные в целевой файл.

// Пример копирования файла с использованием потоков:
const fs = require('fs');

// Создаем Readable поток для чтения исходного файла
const readableStream = fs.createReadStream('source.txt');

// Создаем Writable поток для записи в целевой файл
const writableStream = fs.createWriteStream('destination.txt');

// Используем метод pipe() для передачи данных из readableStream в writableStream
readableStream.pipe(writableStream);

// Подписываемся на события потока для обработки ошибок и завершения
readableStream.on('error', (err) => {
  console.error('Error reading the source file:', err);
});

writableStream.on('error', (err) => {
  console.error('Error writing to the destination file:', err);
});

writableStream.on('finish', () => {
  console.log('File copy completed successfully.');
});

// Итог:
// Модуль stream предоставляет мощные инструменты для работы с потоковыми данными в Node.js.
// Использование потоков для копирования файлов позволяет эффективно обрабатывать большие файлы без загрузки всего содержимого в память.
// Важно обрабатывать ошибки и завершение потоков для обеспечения надежности операций копирования.
