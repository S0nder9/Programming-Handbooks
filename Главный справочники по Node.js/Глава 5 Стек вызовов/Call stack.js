// Глава 5: Стек вызовов (Call Stack)

// Стек вызовов (Call Stack) — это механизм, который используется интерпретатором JavaScript для отслеживания выполнения функций.
// Он работает по принципу LIFO (Last In, First Out) — последним вошел, первым вышел.

// Основные понятия:
// 1. Вызов функции — когда функция вызывается, она добавляется в стек вызовов.
// 2. Завершение функции — когда функция завершает выполнение, она удаляется из стека вызовов.

// Пример работы стека вызовов:
function firstFunction() {
    console.log('Вызов firstFunction');
    secondFunction();
    console.log('Завершение firstFunction');
  }
  
  function secondFunction() {
    console.log('Вызов secondFunction');
    thirdFunction();
    console.log('Завершение secondFunction');
  }
  
  function thirdFunction() {
    console.log('Вызов thirdFunction');
    // thirdFunction завершает выполнение, ничего не делая
    console.log('Завершение thirdFunction');
  }
  
  // Начнем выполнение программы
  firstFunction();
  
  // Порядок выполнения будет следующим:
  // 1. Вызов firstFunction -> стек: [firstFunction]
  // 2. Вызов secondFunction внутри firstFunction -> стек: [firstFunction, secondFunction]
  // 3. Вызов thirdFunction внутри secondFunction -> стек: [firstFunction, secondFunction, thirdFunction]
  // 4. Завершение thirdFunction -> стек: [firstFunction, secondFunction]
  // 5. Завершение secondFunction -> стек: [firstFunction]
  // 6. Завершение firstFunction -> стек: []
  
  // Пример обработки ошибок с помощью стека вызовов:
  function errorProneFunction() {
    throw new Error('Что-то пошло не так!');
  }
  
  function safeFunction() {
    try {
      errorProneFunction();
    } catch (error) {
      console.error('Ошибка перехвачена:', error);
    }
  }
  
  safeFunction();
  
  // Стек вызовов и рекурсия
  // В рекурсивных функциях каждый рекурсивный вызов добавляется в стек вызовов, что может привести к переполнению стека.
  
  function recursiveFunction(n) {
    if (n <= 0) {
      return;
    }
    console.log(n);
    recursiveFunction(n - 1);
  }
  
  // Начнем рекурсивное выполнение
  recursiveFunction(5);
  // Порядок выполнения будет следующим:
  // 1. Вызов recursiveFunction(5) -> стек: [recursiveFunction(5)]
  // 2. Вызов recursiveFunction(4) -> стек: [recursiveFunction(5), recursiveFunction(4)]
  // 3. Вызов recursiveFunction(3) -> стек: [recursiveFunction(5), recursiveFunction(4), recursiveFunction(3)]
  // 4. Вызов recursiveFunction(2) -> стек: [recursiveFunction(5), recursiveFunction(4), recursiveFunction(3), recursiveFunction(2)]
  // 5. Вызов recursiveFunction(1) -> стек: [recursiveFunction(5), recursiveFunction(4), recursiveFunction(3), recursiveFunction(2), recursiveFunction(1)]
  // 6. Вызов recursiveFunction(0) -> стек: [recursiveFunction(5), ..., recursiveFunction(1), recursiveFunction(0)]
  // 7. Завершение recursiveFunction(0) -> стек: [recursiveFunction(5), ..., recursiveFunction(1)]
  // 8. Завершение recursiveFunction(1) -> стек: [recursiveFunction(5), ..., recursiveFunction(2)]
  // и так далее...
  
  // Итог:
  // Стек вызовов является важной частью механизма выполнения JavaScript.
  // Он используется для отслеживания вызовов функций и управления их выполнением.
  // Понимание работы стека вызовов помогает лучше разобраться в процессе выполнения кода и отладки ошибок.
