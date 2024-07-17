// Глава 9: Модуль fs - Запись в файл с помощью модуля fs в Node.js

// Модуль fs (file system) в Node.js предоставляет функции для работы с файловой системой, 
// включая чтение, запись, удаление и другие операции с файлами и директориями.
// В этой главе рассмотрим, как использовать модуль fs для записи данных в файл.

// Импорт модуля fs:
const fs = require('fs');

// Запись в файл с помощью fs.writeFile:
// Метод fs.writeFile позволяет записывать данные в файл. Если файл не существует, он будет создан.

const data = 'Hello, this is a test message';

// Запись данных в файл 'example.txt':
fs.writeFile('example.txt', data, (err) => {
  if (err) {
    console.error('Error writing to file:', err);
    return;
  }
  console.log('Data written to file successfully');
});

// Запись в файл с помощью fs.writeFileSync:
// Метод fs.writeFileSync является синхронной версией fs.writeFile. Он блокирует выполнение кода до завершения записи.

try {
  fs.writeFileSync('example-sync.txt', data);
  console.log('Data written to file successfully using fs.writeFileSync');
} catch (err) {
  console.error('Error writing to file:', err);
}

// Добавление данных в файл с помощью fs.appendFile:
// Метод fs.appendFile добавляет данные в конец файла. Если файл не существует, он будет создан.

const additionalData = '\nThis is additional data';

// Добавление данных в файл 'example.txt':
fs.appendFile('example.txt', additionalData, (err) => {
  if (err) {
    console.error('Error appending to file:', err);
    return;
  }
  console.log('Data appended to file successfully');
});

// Добавление данных в файл с помощью fs.appendFileSync:
// Метод fs.appendFileSync является синхронной версией fs.appendFile.

try {
  fs.appendFileSync('example-sync.txt', additionalData);
  console.log('Data appended to file successfully using fs.appendFileSync');
} catch (err) {
  console.error('Error appending to file:', err);
}

// Итог:
// Модуль fs в Node.js предоставляет мощные инструменты для работы с файловой системой.
// Методы fs.writeFile и fs.writeFileSync позволяют записывать данные в файл, 
// а методы fs.appendFile и fs.appendFileSync позволяют добавлять данные в существующий файл.
