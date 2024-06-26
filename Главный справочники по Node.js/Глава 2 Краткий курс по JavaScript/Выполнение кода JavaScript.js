// Глава 2: Краткий курс по JavaScript

// Выполнение кода JavaScript

// JavaScript является интерпретируемым языком программирования, что означает, что его код выполняется построчно 
// и интерпретируется во время выполнения. Давайте рассмотрим основные моменты выполнения кода JavaScript.

// 1. Подготовка среды выполнения

// Когда браузер или Node.js загружает скрипт JavaScript, он сначала создает глобальное окружение, 
// где будут определены все глобальные объекты и функции.

console.log("Привет, мир!"); // Этот код будет выполнен при загрузке скрипта

// 2. Область видимости

// JavaScript использует области видимости для определения доступности переменных и функций. 
// Основные области видимости - это глобальная и локальная.

// Глобальная область видимости
var globalVariable = "Я глобальная переменная";

function testScope() {
  // Локальная область видимости
  var localVariable = "Я локальная переменная";
  console.log(globalVariable); // Доступна
  console.log(localVariable);  // Доступна
}

testScope();

console.log(globalVariable); // Доступна
// console.log(localVariable);  // Ошибка: localVariable is not defined

// 3. Hoisting (Поднятие)

// JavaScript имеет механизм поднятия (hoisting), который позволяет использовать функции и переменные до их объявления.

console.log(hoistedVariable); // undefined (переменная поднята, но не инициализирована)
var hoistedVariable = "Я поднятая переменная";

hoistedFunction(); // Работает, так как функции поднимаются полностью

function hoistedFunction() {
  console.log("Я поднятая функция");
}

// 4. Event Loop (Цикл событий)

// JavaScript является однопоточным языком, но он поддерживает асинхронные операции через механизм event loop.

console.log("Начало");

setTimeout(() => {
  console.log("Асинхронный вызов");
}, 1000);

console.log("Конец");

// Ожидаемый вывод:
// Начало
// Конец
// Асинхронный вызов

// 5. Контекст выполнения (Execution Context)

// Каждый раз, когда функция вызывается, создается новый контекст выполнения. 
// Контекст выполнения содержит переменные, объекты и функции, доступные в данной области видимости.

function outerFunction() {
  var outerVariable = "Я внешняя переменная";

  function innerFunction() {
    var innerVariable = "Я внутренняя переменная";
    console.log(outerVariable); // Доступна
    console.log(innerVariable); // Доступна
  }

  innerFunction();
  // console.log(innerVariable); // Ошибка: innerVariable is not defined
}

outerFunction();

// 6. Замыкания (Closures)

// Замыкания позволяют функции запоминать и получать доступ к области видимости, в которой она была создана, 
// даже после завершения выполнения этой области видимости.

function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// 7. Strict Mode (Строгий режим)

// Strict Mode в JavaScript позволяет включить более строгие правила для написания кода, 
// что помогает избежать распространенных ошибок.

"use strict";

function strictModeExample() {
  // В строгом режиме некоторые ошибки становятся явными
  // undeclaredVariable = "Ошибка!"; // Ошибка: undeclaredVariable is not defined
}

// 8. Обработка ошибок

// В JavaScript есть встроенные механизмы для обработки ошибок с использованием try...catch...finally.

try {
  throw new Error("Что-то пошло не так");
} catch (error) {
  console.error("Произошла ошибка:", error.message);
} finally {
  console.log("Этот блок выполнится в любом случае");
}

// Итог:
// Выполнение кода JavaScript включает в себя множество аспектов, таких как области видимости, поднятие, 
// цикл событий, контексты выполнения и замыкания. Понимание этих концепций помогает писать эффективный и 
// предсказуемый код. Использование строгого режима и механизмов обработки ошибок позволяет избежать 
// распространенных ошибок и улучшить качество кода.
