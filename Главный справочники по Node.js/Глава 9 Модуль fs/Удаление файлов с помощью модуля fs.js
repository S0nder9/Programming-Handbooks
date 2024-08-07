// Глава 9: Модуль fs - Удаление файлов с помощью модуля fs в Node.js

// В Node.js модуль 'fs' (file system) предоставляет множество функций для работы с файловой системой.
// Одной из таких функций является удаление файлов.
// Удаление файлов может быть выполнено с помощью методов fs.unlink и fs.unlinkSync.

// Как работают методы fs.unlink и fs.unlinkSync:
// fs.unlink - асинхронный метод для удаления файла. Требует колбэк-функцию для обработки ошибок или завершения операции.
// fs.unlinkSync - синхронный метод для удаления файла. Блокирует выполнение программы до завершения операции.

// Пример асинхронного удаления файла с помощью fs.unlink:
const fs = require('fs');

fs.unlink('path/to/file.txt', (err) => {
  if (err) {
    console.error('Ошибка при удалении файла:', err);
  } else {
    console.log('Файл успешно удален');
  }
});

// Пример синхронного удаления файла с помощью fs.unlinkSync:
const fs = require('fs');

try {
  fs.unlinkSync('path/to/file.txt');
  console.log('Файл успешно удален');
} catch (err) {
  console.error('Ошибка при удалении файла:', err);
}

// Как выбрать между fs.unlink и fs.unlinkSync:
// Используйте fs.unlink для асинхронного выполнения, что позволяет программе продолжить выполнение других задач.
// Используйте fs.unlinkSync для простых скриптов или при необходимости удалить файл перед выполнением последующих операций.

// Обработка ошибок:
// Важно обрабатывать ошибки при удалении файлов, так как файл может быть заблокирован, не существовать или возникнуть другая ошибка.
// Асинхронный метод fs.unlink передает ошибку в колбэк-функцию, а синхронный метод fs.unlinkSync выбрасывает исключение, которое можно поймать с помощью try-catch.

// Пример обработки ошибок для fs.unlink:
fs.unlink('path/to/file.txt', (err) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('Файл не найден');
    } else {
      console.error('Ошибка при удалении файла:', err);
    }
  } else {
    console.log('Файл успешно удален');
  }
});

// Пример обработки ошибок для fs.unlinkSync:
try {
  fs.unlinkSync('path/to/file.txt');
  console.log('Файл успешно удален');
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error('Файл не найден');
  } else {
    console.error('Ошибка при удалении файла:', err);
  }
}

// Итог:
// Модуль fs в Node.js предоставляет мощные методы для работы с файловой системой, включая удаление файлов.
// fs.unlink и fs.unlinkSync позволяют асинхронно и синхронно удалять файлы соответственно.
// Всегда обрабатывайте ошибки при работе с файловой системой, чтобы обеспечить надежность и устойчивость вашего кода.