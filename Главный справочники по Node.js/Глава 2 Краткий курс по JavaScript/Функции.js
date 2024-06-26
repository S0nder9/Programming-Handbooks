// Глава 2: Краткий курс по JavaScript - Функции

// Функции являются основным строительным блоком в JavaScript, позволяя организовывать повторно используемый код.

// 1. Объявление функций:

// Литеральное объявление функции
function greet(name) {
  return `Привет, ${name}!`;
}

// Функциональное выражение
const multiply = function(a, b) {
  return a * b;
};

// Стрелочная функция (ES6+)
const square = (x) => x * x;

// 2. Вызов функций:
console.log(greet('Миша')); // Вывод: Привет, Миша!
console.log(multiply(5, 3)); // Вывод: 15
console.log(square(4)); // Вывод: 16

// 3. Параметры и аргументы:
function sum(a, b) {
  return a + b;
}
console.log(sum(2, 3)); // Вывод: 5

// 4. Возврат значения:
function isAdult(age) {
  return age >= 18;
}
console.log(isAdult(25)); // Вывод: true

// 5. Замыкания (closures):
function makeCounter() {
  let count = 0;
  return function() {
    return count++;
  };
}
const counter = makeCounter();
console.log(counter()); // Вывод: 0
console.log(counter()); // Вывод: 1

// 6. Рекурсия:
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
console.log(factorial(5)); // Вывод: 120

// 7. Методы и this:
const person = {
  name: 'Alice',
  greet: function() {
    return `Привет, меня зовут ${this.name}.`;
  }
};
console.log(person.greet()); // Вывод: Привет, меня зовут Alice.

// Этот пример демонстрирует основные аспекты работы с функциями в JavaScript.
