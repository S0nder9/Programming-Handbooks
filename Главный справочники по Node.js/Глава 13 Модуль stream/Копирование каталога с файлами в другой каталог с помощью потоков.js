// Глава 13: Модуль stream - Копирование каталога с файлами в другой каталог с помощью потоков в Node.js

// В Node.js модуль stream предоставляет API для работы с потоками данных.
// Потоки позволяют читать и записывать данные асинхронно и эффективно.
// Мы можем использовать потоки для копирования файлов из одного каталога в другой.

// Как работают потоки:
// Потоки бывают четырех типов: Readable, Writable, Duplex и Transform.
// Для копирования файлов нам понадобятся Readable (поток для чтения данных) и Writable (поток для записи данных).

// Копирование каталога с файлами:
// Чтобы скопировать файлы из одного каталога в другой, нам нужно:
// 1. Прочитать содержимое исходного каталога.
// 2. Создать соответствующие потоки для чтения и записи данных каждого файла.
// 3. Обрабатывать ошибки, которые могут возникнуть в процессе копирования.

// Пример копирования каталога с файлами:

const fs = require('fs');
const path = require('path');

const sourceDir = 'path/to/source/directory';
const targetDir = 'path/to/target/directory';

// Функция для копирования одного файла
function copyFile(sourceFile, targetFile) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(sourceFile);
    const writeStream = fs.createWriteStream(targetFile);

    readStream.on('error', reject);
    writeStream.on('error', reject);
    writeStream.on('finish', resolve);

    readStream.pipe(writeStream);
  });
}

// Функция для копирования каталога
async function copyDirectory(sourceDir, targetDir) {
  // Создаем целевой каталог, если его не существует
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const items = fs.readdirSync(sourceDir);

  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const targetPath = path.join(targetDir, item);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      // Если элемент является каталогом, рекурсивно копируем его содержимое
      await copyDirectory(sourcePath, targetPath);
    } else {
      // Если элемент является файлом, копируем его
      await copyFile(sourcePath, targetPath);
    }
  }
}

// Используем функцию для копирования каталога
copyDirectory(sourceDir, targetDir)
  .then(() => console.log('Каталог успешно скопирован'))
  .catch((error) => console.error('Ошибка при копировании каталога:', error));

// Итог:
// Модуль stream в Node.js предоставляет мощный и гибкий способ работы с данными.
// Используя потоки чтения и записи, мы можем эффективно копировать файлы из одного каталога в другой.
// Этот подход позволяет обрабатывать большие файлы без загрузки их целиком в память, что делает его очень эффективным для копирования больших объемов данных.
