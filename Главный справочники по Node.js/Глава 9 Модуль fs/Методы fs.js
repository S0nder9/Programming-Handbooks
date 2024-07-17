// Глава 9: Модуль fs

// Модуль fs (file system) в Node.js предоставляет API для работы с файловой системой.
// Он позволяет выполнять операции с файлами и директориями, такие как чтение, запись, удаление и многое другое.
// Методы fs бывают асинхронными (рекомендуемые) и синхронными (блокирующие).

const fs = require('fs');

// 1. Чтение файлов

// Асинхронное чтение файла:
fs.readFile('path/to/file', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Синхронное чтение файла:
const data = fs.readFileSync('path/to/file', 'utf8');
console.log(data);

// 2. Запись в файлы

// Асинхронная запись в файл:
fs.writeFile('path/to/file', 'Hello, world!', (err) => {
  if (err) throw err;
  console.log('File has been saved!');
});

// Синхронная запись в файл:
fs.writeFileSync('path/to/file', 'Hello, world!');
console.log('File has been saved!');

// 3. Добавление в файл

// Асинхронное добавление данных в файл:
fs.appendFile('path/to/file', '\nNew content!', (err) => {
  if (err) throw err;
  console.log('Content has been appended!');
});

// Синхронное добавление данных в файл:
fs.appendFileSync('path/to/file', '\nNew content!');
console.log('Content has been appended!');

// 4. Удаление файлов

// Асинхронное удаление файла:
fs.unlink('path/to/file', (err) => {
  if (err) throw err;
  console.log('File has been deleted!');
});

// Синхронное удаление файла:
fs.unlinkSync('path/to/file');
console.log('File has been deleted!');

// 5. Переименование файлов

// Асинхронное переименование файла:
fs.rename('path/to/file', 'path/to/newfile', (err) => {
  if (err) throw err;
  console.log('File has been renamed!');
});

// Синхронное переименование файла:
fs.renameSync('path/to/file', 'path/to/newfile');
console.log('File has been renamed!');

// 6. Работа с директориями

// Асинхронное создание директории:
fs.mkdir('path/to/dir', { recursive: true }, (err) => {
  if (err) throw err;
  console.log('Directory has been created!');
});

// Синхронное создание директории:
fs.mkdirSync('path/to/dir', { recursive: true });
console.log('Directory has been created!');

// Асинхронное чтение директории:
fs.readdir('path/to/dir', (err, files) => {
  if (err) throw err;
  console.log(files);
});

// Синхронное чтение директории:
const files = fs.readdirSync('path/to/dir');
console.log(files);

// Асинхронное удаление директории:
fs.rmdir('path/to/dir', { recursive: true }, (err) => {
  if (err) throw err;
  console.log('Directory has been deleted!');
});

// Синхронное удаление директории:
fs.rmdirSync('path/to/dir', { recursive: true });
console.log('Directory has been deleted!');

// 7. Информация о файлах и директориях

// Асинхронное получение информации о файле:
fs.stat('path/to/file', (err, stats) => {
  if (err) throw err;
  console.log(stats);
});

// Синхронное получение информации о файле:
const stats = fs.statSync('path/to/file');
console.log(stats);

// 8. Символические ссылки

// Асинхронное создание символической ссылки:
fs.symlink('path/to/original', 'path/to/link', (err) => {
  if (err) throw err;
  console.log('Symbolic link has been created!');
});

// Синхронное создание символической ссылки:
fs.symlinkSync('path/to/original', 'path/to/link');
console.log('Symbolic link has been created!');

// 9. Потоки чтения и записи

// Создание потока чтения:
const readStream = fs.createReadStream('path/to/file', 'utf8');
readStream.on('data', (chunk) => {
  console.log(chunk);
});

// Создание потока записи:
const writeStream = fs.createWriteStream('path/to/file');
writeStream.write('Hello, ');
writeStream.write('world!');
writeStream.end();
writeStream.on('finish', () => {
  console.log('Writing completed!');
});

// 10. События файловой системы

// Наблюдение за изменениями в файле или директории:
fs.watch('path/to/fileOrDir', (eventType, filename) => {
  console.log(`Event: ${eventType}`);
  console.log(`Filename: ${filename}`);
});

// Асинхронное копирование файла:
fs.copyFile('source/path', 'destination/path', (err) => {
  if (err) throw err;
  console.log('File has been copied!');
});

// Синхронное копирование файла:
fs.copyFileSync('source/path', 'destination/path');
console.log('File has been copied!');

// Итог:
// Модуль fs предоставляет богатый набор методов для работы с файлами и директориями в Node.js.
// Используйте асинхронные методы для повышения производительности и избегания блокировки основного потока выполнения.
