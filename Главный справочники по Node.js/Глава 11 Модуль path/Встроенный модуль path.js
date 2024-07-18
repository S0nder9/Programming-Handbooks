// Глава 11: Модуль path - Встроенный модуль path в Node.js

// Встроенный модуль path в Node.js предоставляет утилиты для работы с путями файлов и каталогов.
// Он позволяет обрабатывать и манипулировать путями в кроссплатформенной манере, учитывая особенности различных операционных систем.

// Импорт модуля path:
const path = require('path');

// Основные методы модуля path:

// 1. path.basename
// Возвращает последнюю часть пути (имя файла с расширением).
const fullPath = '/home/user/docs/file.txt';
const baseName = path.basename(fullPath);
console.log(baseName); // Выведет: file.txt

// 2. path.dirname
// Возвращает директорию пути.
const dirName = path.dirname(fullPath);
console.log(dirName); // Выведет: /home/user/docs

// 3. path.extname
// Возвращает расширение файла.
const extName = path.extname(fullPath);
console.log(extName); // Выведет: .txt

// 4. path.join
// Соединяет все аргументы в единый путь.
const joinedPath = path.join('/home', 'user', 'docs', 'file.txt');
console.log(joinedPath); // Выведет: /home/user/docs/file.txt

// 5. path.resolve
// Возвращает абсолютный путь, разрешая последовательность путей.
const resolvedPath = path.resolve('user', 'docs', 'file.txt');
console.log(resolvedPath); // Абсолютный путь до файла file.txt относительно текущего рабочего каталога

// 6. path.parse
// Разбирает путь на объект с его компонентами.
const parsedPath = path.parse(fullPath);
console.log(parsedPath);
// Выведет:
// {
//   root: '/',
//   dir: '/home/user/docs',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

// 7. path.format
// Формирует путь из объекта, подобного тому, который возвращает path.parse.
const formattedPath = path.format(parsedPath);
console.log(formattedPath); // Выведет: /home/user/docs/file.txt

// Итог:
// Модуль path в Node.js предоставляет мощные и удобные инструменты для работы с путями файлов и каталогов.
// Используя эти методы, можно легко манипулировать путями, не беспокоясь о кроссплатформенных различиях.
