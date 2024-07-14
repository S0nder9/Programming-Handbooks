// Глава 6: Модули CommonJS - Импорт и экспорт в одном модуле в NodeJS

// В Node.js модули CommonJS позволяют импортировать и экспортировать функции, объекты или значения в одном и том же модуле.
// Это дает возможность создавать модули, которые используют другие модули и в то же время экспортируют свои собственные функциональности.

// Как работают модули с импортом и экспортом:
// В Node.js используется функция require для импорта модулей.
// Для экспорта используется объект module.exports или его свойство exports.
// Можно одновременно импортировать другие модули и экспортировать свои собственные.

const fs = require('fs'); // Импорт встроенного модуля fs для работы с файловой системой

const readFileContent = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8'); // Чтение содержимого файла
    return content;
  } catch (error) {
    console.error('Error reading file:', error); // Обработка ошибок при чтении файла
    return null;
  }
};

const writeFileContent = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, content, 'utf-8'); // Запись содержимого в файл
    console.log('File written successfully');
  } catch (error) {
    console.error('Error writing file:', error); // Обработка ошибок при записи файла
  }
};

// Экспорт функций readFileContent и writeFileContent
module.exports = {
  readFileContent,
  writeFileContent,
};

// Пример использования модуля с импортом и экспортом:
const fileModule = require('./fileModule'); // Импорт модуля fileModule

const filePath = './example.txt';
const content = fileModule.readFileContent(filePath); // Использование импортированной функции для чтения файла

if (content) {
  console.log('File Content:', content); // Вывод содержимого файла
  fileModule.writeFileContent(filePath, 'New content'); // Использование импортированной функции для записи в файл
}

// Итог:
// В модулях Node.js можно одновременно импортировать другие модули и экспортировать свои собственные функции или объекты.
// Это позволяет создавать мощные и гибкие модули, которые могут повторно использовать существующий код и предоставлять новую функциональность.
