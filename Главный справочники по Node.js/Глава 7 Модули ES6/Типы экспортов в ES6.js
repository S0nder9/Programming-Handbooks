// Глава 7: Модули ES6 - Типы экспортов в ES6 в NodeJS

// В ES6 модули позволяют более гибко и изящно управлять экспортом и импортом различных частей кода.
// Node.js поддерживает модули ES6 с использованием директивы "type": "module" в package.json или с расширением файла .mjs.
// Рассмотрим два основных типа экспортов в ES6: named export и default export.

// Named Export (Именованный экспорт):
// Позволяет экспортировать несколько сущностей из одного модуля с их именами.

// Пример именованного экспорта функции:
export function greet() {
  console.log('Hello from greet function');
}

// Пример именованного экспорта переменной:
export const myValue = 42;

// Можно также экспортировать функции и переменные при их объявлении:
const anotherValue = 100;
function anotherFunction() {
  console.log('Another function');
}

export { anotherValue, anotherFunction };

// В другом файле можно импортировать эти сущности с помощью import:
import { greet, myValue, anotherValue, anotherFunction } from './myModule.js';

greet(); // Выведет: Hello from greet function
console.log(myValue); // Выведет: 42
console.log(anotherValue); // Выведет: 100
anotherFunction(); // Выведет: Another function

// Default Export (Экспорт по умолчанию):
// Позволяет экспортировать одну сущность как экспорт по умолчанию из модуля.

// Пример экспорта функции по умолчанию:
export default function defaultGreet() {
  console.log('Hello from default greet function');
}

// В другом файле можно импортировать этот экспорт по умолчанию с помощью import:
import defaultGreet from './myModule.js';

defaultGreet(); // Выведет: Hello from default greet function

// Экспорт по умолчанию может также быть объектом, классом, или значением:
const myObject = {
  name: 'John',
  age: 30,
};

export default myObject;

// В другом файле можно импортировать этот объект по умолчанию:
import importedObject from './myModule.js';

console.log(importedObject.name); // Выведет: John

// Итог:
// ES6 модули предоставляют два основных типа экспортов: named export и default export.
// Именованные экспорты позволяют экспортировать несколько сущностей с их именами.
// Экспорт по умолчанию позволяет экспортировать одну сущность из модуля.
// Эти механизмы экспорта обеспечивают гибкость и упрощают управление зависимостями между модулями.