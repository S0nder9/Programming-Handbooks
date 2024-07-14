// Глава 6: Модули CommonJS - Изменение переменных в других модулях в NodeJS

// В Node.js модули могут экспортировать переменные и функции, которые могут быть изменены в других модулях.
// Это позволяет создавать взаимодействие между модулями и обновлять состояния или данные, находящиеся в разных частях приложения.

// Как работают модули с изменяемыми переменными:
// Экспортируемый объект module.exports или exports может содержать переменные и функции.
// При импорте модуля в другой файл можно изменять эти переменные и использовать функции для изменения состояния.

// Пример изменения переменных в других модулях:
// myModule.js
let myVariable = 10;

const incrementVariable = () => {
  myVariable += 1;
  console.log(`Variable incremented: ${myVariable}`);
};

const getVariable = () => myVariable;

module.exports = {
  incrementVariable,
  getVariable,
};

// В другом файле можно импортировать этот модуль и изменять переменную:
const myModule = require('./myModule');

console.log(`Initial value: ${myModule.getVariable()}`); // Выведет: Initial value: 10

myModule.incrementVariable(); // Выведет: Variable incremented: 11
console.log(`New value: ${myModule.getVariable()}`); // Выведет: New value: 11

// Общий доступ к изменяемым переменным:
// Переменные, экспортированные из модуля, являются общими для всех файлов, которые импортируют этот модуль.
// Это позволяет координировать изменения состояния между различными частями приложения.

// Пример общего доступа к изменяемым переменным:
// counterModule.js
let counter = 0;

const increment = () => {
  counter += 1;
};

const decrement = () => {
  counter -= 1;
};

const getCounter = () => counter;

module.exports = {
  increment,
  decrement,
  getCounter,
};

// В другом файле можно изменить значение счетчика и получить его:
const counterModule = require('./counterModule');

counterModule.increment();
console.log(`Counter after increment: ${counterModule.getCounter()}`); // Выведет: Counter after increment: 1

counterModule.decrement();
console.log(`Counter after decrement: ${counterModule.getCounter()}`); // Выведет: Counter after decrement: 0

// Итог:
// В Node.js модули позволяют экспортировать и изменять переменные в других модулях.
// Это обеспечивает гибкость и возможность взаимодействия между различными частями приложения.
// Важно помнить, что экспортированные переменные являются общими и изменения в одном месте будут видны в других.
