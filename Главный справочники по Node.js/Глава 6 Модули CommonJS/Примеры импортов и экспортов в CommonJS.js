// Глава 6: Модули CommonJS

// CommonJS — это спецификация модулей, которая используется в Node.js для организации кода в модули.
// Она включает в себя синтаксис для импорта и экспорта функциональности между различными файлами JavaScript.

// Основные понятия:
// - **Модуль** — это файл JavaScript, который содержит код, который можно импортировать в другие файлы.
// - **Экспорт** — это процесс, при котором код в одном файле делает свои функции, объекты или классы доступными для других файлов.
// - **Импорт** — это процесс, при котором другой файл включает код из текущего файла.

// Экспортирование функциональности в CommonJS

// В CommonJS для экспорта используется объект `module.exports` или его свойство `exports`.

const greeting = 'Hello, World!';  // Пример переменной, которую можно экспортировать

// Экспортируем переменную
module.exports.greeting = greeting;

// Экспортируем функцию
module.exports.sayHello = function(name) {
  return `${greeting}, ${name}!`;
};

// Экспортируем объект
module.exports.person = {
  name: 'John Doe',
  age: 30,
  greet() {
    return this.name + ' says hello!';
  }
};

// Экспортируем класс
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a noise.`;
  }
}

module.exports.Animal = Animal;

// Импортирование функциональности в CommonJS

// Для импорта функциональности из другого файла используется функция `require()`.

const { greeting, sayHello, person, Animal } = require('./moduleFile');  // Импортируем переменные, функции, объект и класс из другого файла

console.log(greeting);  // Выведет: Hello, World!

// Используем импортированную функцию
console.log(sayHello('Alice'));  // Выведет: Hello, World!, Alice!

// Используем импортированный объект
console.log(person.name);  // Выведет: John Doe
console.log(person.greet());  // Выведет: John Doe says hello!

// Используем импортированный класс
const myAnimal = new Animal('Lion');
console.log(myAnimal.speak());  // Выведет: Lion makes a noise.

// Пример файла moduleFile.js для демонстрации

// Пример содержимого moduleFile.js
// const greeting = 'Hello, World!';

// module.exports.greeting = greeting;
// module.exports.sayHello = function(name) {
//   return `${greeting}, ${name}!`;
// };

// module.exports.person = {
//   name: 'John Doe',
//   age: 30,
//   greet() {
//     return this.name + ' says hello!';
//   }
// };

// class Animal {
//   constructor(name) {
//     this.name = name;
//   }

//   speak() {
//     return `${this.name} makes a noise.`;
//   }
// }

// module.exports.Animal = Animal;

// Преимущества и недостатки CommonJS

// Преимущества:
// - Простота и широкое использование в Node.js
// - Синхронная загрузка модулей

// Недостатки:
// - Модули загружаются синхронно, что может быть проблемой для больших приложений
// - Не поддерживает экспорт нескольких значений без использования объектных литералов

// Общие советы по работе с CommonJS
// - Используйте `module.exports` для экспорта значений, которые должны быть доступны другим файлам
// - Используйте `require()` для импорта функциональности из других файлов
// - Организуйте код в модули для улучшения его структуры и повторного использования

// Итог:
// CommonJS модули позволяют легко разделять код на различные файлы и модули. Используя `module.exports` и `require()`, 
// вы можете экспортировать и импортировать функции, объекты и классы, что делает ваш код более организованным и поддерживаемым.
