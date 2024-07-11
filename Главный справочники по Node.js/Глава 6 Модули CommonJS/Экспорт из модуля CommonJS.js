// Глава 6: Модули CommonJS

// В этой главе мы рассмотрим модули CommonJS и их использование для экспорта из модулей в Node.js.
// Модули CommonJS являются стандартным способом организации и разделения кода в Node.js.

// Основные понятия:
// 1. Модуль — это отдельный файл, который можно импортировать и использовать в других частях кода.
// 2. Экспорт из модуля — это способ сделать части модуля доступными для других файлов.

// Основные методы экспорта в CommonJS:

// 1. Экспорт отдельных значений
// 2. Экспорт объектов и функций
// 3. Экспорт нескольких элементов из одного модуля

// Пример 1: Экспорт отдельных значений

// Это пример модуля, который экспортирует одну функцию.
function greet(name) {
  return `Hello, ${name}!`;
}

module.exports = greet; // Экспортируем функцию greet для использования в других модулях

// Пример использования модуля с экспортом одной функции:

const greet = require('./greet'); // Импортируем функцию greet из модуля greet.js

console.log(greet('Alice')); // Вывод: Hello, Alice!

// Пример 2: Экспорт объектов и функций

// В этом примере мы экспортируем объект, который содержит несколько свойств и методов.
const person = {
  name: 'John Doe',
  age: 30,
  greet() {
    return `Hello, my name is ${this.name}.`;
  },
  setName(newName) {
    this.name = newName;
  },
};

module.exports = person; // Экспортируем объект person для использования в других модулях

// Пример использования модуля с экспортом объекта:

const person = require('./person'); // Импортируем объект person из модуля person.js

console.log(person.greet()); // Вывод: Hello, my name is John Doe.
person.setName('Jane Doe');
console.log(person.greet()); // Вывод: Hello, my name is Jane Doe.

// Пример 3: Экспорт нескольких элементов из одного модуля

// В этом примере мы экспортируем несколько функций из одного модуля.
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = {
  add,
  subtract,
}; // Экспортируем несколько функций для использования в других модулях

// Пример использования модуля с экспортом нескольких функций:

const math = require('./math'); // Импортируем объект с функциями add и subtract из модуля math.js

console.log(math.add(2, 3)); // Вывод: 5
console.log(math.subtract(5, 2)); // Вывод: 3

// Пример 4: Экспорт функции с замыканием

// В этом примере мы экспортируем функцию, которая использует замыкание для хранения состояния.
function createCounter() {
  let count = 0;
  return {
    increment() {
      count += 1;
      return count;
    },
    decrement() {
      count -= 1;
      return count;
    },
    getCount() {
      return count;
    },
  };
}

module.exports = createCounter; // Экспортируем функцию createCounter для использования в других модулях

// Пример использования модуля с функцией, использующей замыкание:

const createCounter = require('./counter'); // Импортируем функцию createCounter из модуля counter.js

const counter = createCounter();
console.log(counter.increment()); // Вывод: 1
console.log(counter.increment()); // Вывод: 2
console.log(counter.getCount()); // Вывод: 2
console.log(counter.decrement()); // Вывод: 1

// Пример 5: Экспорт класса

// В этом примере мы экспортируем класс, который можно использовать для создания экземпляров.
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, my name is ${this.name}.`;
  }
}

module.exports = Person; // Экспортируем класс Person для использования в других модулях

// Пример использования модуля с экспортом класса:

const Person = require('./Person'); // Импортируем класс Person из модуля Person.js

const person = new Person('Alice');
console.log(person.greet()); // Вывод: Hello, my name is Alice.

// Дополнительные ресурсы:
// - [Официальная документация Node.js по CommonJS модулям](https://nodejs.org/api/modules.html)
// - [Введение в CommonJS модули](https://nodejs.org/en/knowledge/getting-started/modules/what-are-modules/)

// Итог:
// Экспорт из модулей в CommonJS позволяет вам организовать код в Node.js и создавать многоразовые компоненты. 
// Понимание различных методов экспорта и их применение поможет вам создавать более чистый и поддерживаемый код.

