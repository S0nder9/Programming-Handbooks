// Глава 6: Модули CommonJS

// В Node.js модули CommonJS — это основной способ организации и разделения кода. Они позволяют инкапсулировать функциональность в модулях и управлять зависимостями между ними. 

// В этой главе мы рассмотрим, как устроен модуль CommonJS в Node.js, и изучим различные встроенные объекты и функции, которые доступны в каждом модуле.

// 6.1 Как устроен модуль CommonJS в Node.js

// function (exports, require, module, __filename, __dirname) {
//   console.log(arguments.callee.toString());
//   }

// Каждый файл в Node.js является отдельным модулем. Внутри каждого модуля доступны следующие глобальные объекты:
// __filename
// __dirname
// arguments.callee
// module
// exports
// require


// 6.2 Основные объекты и функции модуля

// 1. __filename

// __filename — это глобальная переменная, которая содержит абсолютный путь к текущему файлу модуля.

console.log('__filename:', __filename);
// Вывод: /path/to/your/file.js

// 2. __dirname

// __dirname — это глобальная переменная, которая содержит абсолютный путь к директории, в которой находится текущий файл модуля.

console.log('__dirname:', __dirname);
// Вывод: /path/to/your

// 3. arguments.callee

// arguments.callee — это свойство объекта arguments, которое ссылается на текущую функцию. Это устаревшая возможность, которая больше не рекомендуется к использованию и была удалена в строгом режиме.

function exampleFunction() {
  console.log('arguments.callee.toString():', arguments.callee.toString());
  // Вывод: function exampleFunction() { ... } - строковое представление функции
}

exampleFunction();

// В строгом режиме (strict mode) `arguments.callee` не доступен. 

// 4. module

// module — это объект, представляющий текущий модуль. В его свойствах можно найти информацию о модуле и его экспорте.

console.log('module:', module);
/*
Вывод:
Module {
  id: '.',
  filename: '/path/to/your/file.js',
  loaded: false,
  children: [],
  paths: [ ... ],
  exports: {}
}
*/

// 5. exports

// exports — это объект, который используется для определения того, что модуль экспортирует наружу. По умолчанию `exports` ссылается на `module.exports`, поэтому все, что вы добавляете в `exports`, становится доступным для других модулей.

exports.sayHello = function() {
  console.log('Hello from the module!');
};

// Другие модули могут импортировать этот функционал следующим образом:
// const { sayHello } = require('./path/to/your/file');
// sayHello(); // Выведет: Hello from the module!

// 6. require

// require — это функция, которая используется для импорта модулей, JSON-файлов и других ресурсов в текущий модуль.

const fs = require('fs'); // Импорт встроенного модуля 'fs'
console.log('fs:', fs);
// Вывод: [Object: null prototype] { ... } - объект модуля fs с его методами

// Вы также можете импортировать модули, которые вы создали сами
const myModule = require('./myModule'); // Импорт модуля из файла myModule.js
myModule.sayHello(); // Выведет: Hello from the module!

// Итог:
// Модули CommonJS в Node.js предоставляют мощный механизм для управления кодом и зависимостями. 
// Основные объекты и функции, такие как __filename, __dirname, module, exports и require, играют важную роль в создании модульной архитектуры приложений на Node.js. 

// Примеры использования этих элементов помогают понять, как работать с модулями и как их эффективно использовать для создания масштабируемых приложений.
