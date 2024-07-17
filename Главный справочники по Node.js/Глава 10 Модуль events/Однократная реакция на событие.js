// Глава 10: Модуль events - Однократная реакция на событие в Node.js

// В Node.js модуль `events` используется для создания и управления событиями.
// Одним из полезных методов модуля `events` является `once`, который позволяет зарегистрировать обработчик события, который будет вызван только один раз.

// Как работает `once` метод:
// Метод `once` позволяет добавить обработчик для события, который сработает только один раз.
// После того как событие произойдет и обработчик будет вызван, он автоматически удаляется, и последующие события не будут его вызывать.

// Как использовать `once` метод:
const EventEmitter = require('events'); // Импортируем модуль events

const myEmitter = new EventEmitter(); // Создаем новый экземпляр EventEmitter

// Регистрация однократного обработчика события 'data'
myEmitter.once('data', (message) => {
  console.log('Data event triggered:', message);
});

// Вызов события 'data'
myEmitter.emit('data', 'Hello World!'); // Выведет: Data event triggered: Hello World!

// Попытка вызвать событие 'data' снова не вызовет обработчик
myEmitter.emit('data', 'This will not be logged');

// Пример использования `once` для обработки событий с асинхронными действиями:
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Регистрация однократного обработчика события 'finish'
myEmitter.once('finish', async () => {
  console.log('Event triggered only once');
  await new Promise(resolve => setTimeout(resolve, 1000)); // Симуляция асинхронной операции
  console.log('Async operation completed');
});

// Вызов события 'finish'
myEmitter.emit('finish'); // Выведет: Event triggered only once
                           // Через 1 секунду: Async operation completed

// Итог:
// Метод `once` в модуле `events` позволяет зарегистрировать обработчик события, который вызовется только один раз.
// Это удобно для событий, которые происходят только один раз или должны быть обработаны лишь однажды в течение работы приложения.
// Используйте `once` для управления событиями и предотвращения повторных вызовов обработчиков.

