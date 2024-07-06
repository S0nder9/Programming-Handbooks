// Глава 4: Цикл событий - Архитектура Node.js

// События setImmediate

// В этой главе мы рассмотрим метод setImmediate в Node.js. Этот метод используется для планирования выполнения функции в следующем цикле событий.

// Что такое setImmediate?

// setImmediate() — это метод в Node.js, который планирует выполнение функции в следующем цикле событий, после того, как текущий цикл событий завершится.

// Синтаксис setImmediate():
// setImmediate(callback, [arg1, arg2, ...]);

// Параметры:
// - callback: Функция, которая будет вызвана после завершения текущего цикла событий.
// - arg1, arg2, ...: Необязательные аргументы, которые будут переданы в callback.

// Пример использования setImmediate():
console.log('Start');

setImmediate(() => {
  console.log('Inside setImmediate');
});

console.log('End');

// Ожидаемый вывод:
// Start
// End
// Inside setImmediate

// Как работает setImmediate?

// setImmediate() добавляет функцию в очередь событий, которая будет выполнена в следующем цикле событий после завершения текущего выполнения скрипта.
// В отличие от process.nextTick(), который выполняет функцию до завершения текущего кода, setImmediate() ждет до завершения всего текущего цикла событий.

// Пример сравнения с process.nextTick():
console.log('Start');

process.nextTick(() => {
  console.log('Inside process.nextTick');
});

setImmediate(() => {
  console.log('Inside setImmediate');
});

console.log('End');

// Ожидаемый вывод:
// Start
// End
// Inside process.nextTick
// Inside setImmediate

// В этом примере видно, что setImmediate() выполняется после process.nextTick() и после текущего выполнения кода.

// Использование setImmediate()

// setImmediate() обычно используется для выполнения отложенных задач или для выполнения задач, которые не требуют немедленного выполнения.
// Это полезно в ситуациях, когда вам нужно отделить выполнение функции от основного потока выполнения.

// Пример использования setImmediate() для выполнения отложенной задачи:
function delayedTask() {
  console.log('Delayed Task');
}

console.log('Start');

setImmediate(delayedTask);

console.log('End');

// Ожидаемый вывод:
// Start
// End
// Delayed Task

// В этом примере функция delayedTask() запланирована для выполнения в следующем цикле событий с помощью setImmediate().

// Примеры сценариев для использования setImmediate():

// 1. Выполнение кода после завершения текущего цикла событий:
// setImmediate(() => {
//   console.log('This runs in the next event loop iteration');
// });

// 2. В случаях, когда нужно обработать долгие задачи и не блокировать основной поток:
// function longRunningTask() {
//   setImmediate(() => {
//     // Код для долгой задачи
//   });
// }

// 3. Запуск кода для обработки результатов работы другого кода:
// const result = someFunction();
// setImmediate(() => {
//   // Обработка результата функции
//   console.log(result);
// });

// Отличия setImmediate() от других методов:

// - process.nextTick(): Сначала выполняет отложенные задачи. Используется для выполнения кода перед завершением текущего выполнения.
// - setTimeout(callback, 0): Выполняет код через 0 миллисекунд, но это не гарантирует выполнение после завершения текущего цикла событий.
// - setInterval(callback, 0): Выполняет код через определенные интервалы времени, а не только один раз как setImmediate().

// Пример сравнения setImmediate() и setTimeout():
console.log('Start');

setTimeout(() => {
  console.log('Inside setTimeout');
}, 0);

setImmediate(() => {
  console.log('Inside setImmediate');
});

console.log('End');

// Ожидаемый вывод:
// Start
// End
// Inside setImmediate
// Inside setTimeout

// Здесь setImmediate() выполняется перед setTimeout(), несмотря на то, что оба запланированы с нулевой задержкой.

// Итог:

// setImmediate() — это полезный метод в Node.js для планирования задач на выполнение в следующем цикле событий.
// Он позволяет разделить выполнение кода и управлять задачами без блокировки текущего выполнения.
// Понимание и правильное использование setImmediate() помогает создавать более эффективные и отзывчивые Node.js приложения.

// Важно понимать разницу между setImmediate(), process.nextTick(), setTimeout() и setInterval() для выбора наиболее подходящего метода для ваших задач.

