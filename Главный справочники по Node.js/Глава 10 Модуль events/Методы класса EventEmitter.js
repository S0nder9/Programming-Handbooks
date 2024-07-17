// Глава 10: Модуль events - Методы класса EventEmitter

// Класс EventEmitter в Node.js используется для управления и обработки событий. 
// Он предоставляет методы для регистрации обработчиков событий, их вызова и управления событиями в целом.

const EventEmitter = require('events');

// Основные методы класса EventEmitter:

// 1. on(eventName, listener)
// Регистрация обработчика события. Слушатель будет вызываться при каждом событии с указанным именем.
// Пример:
const emitter = new EventEmitter();
emitter.on('event', () => {
  console.log('event has occurred');
});

// 2. once(eventName, listener)
// Регистрация одноразового обработчика события. Слушатель будет вызван только один раз при первом событии с указанным именем.
// Пример:
emitter.once('event', () => {
  console.log('event will occur only once');
});

// 3. off(eventName, listener)
// Удаление конкретного обработчика события. Этот метод удаляет обработчик, который был ранее зарегистрирован с тем же именем события и функцией слушателя.
// Пример:
const handler = () => console.log('event');
emitter.on('event', handler);
emitter.off('event', handler); // Удаляет handler для события 'event'

// 4. removeListener(eventName, listener)
// Альтернативное название метода off. Удаляет обработчик события по имени и функции слушателя.
// Пример:
emitter.removeListener('event', handler); // Удаляет handler для события 'event'

// 5. removeAllListeners([eventName])
// Удаление всех обработчиков для указанного события или всех событий, если имя события не указано.
// Пример:
emitter.removeAllListeners('event'); // Удаляет все обработчики для события 'event'

// 6. emit(eventName, [...args])
// Генерация события с указанным именем и аргументами. Все зарегистрированные обработчики для этого события будут вызваны.
// Пример:
emitter.emit('event', 'arg1', 'arg2'); // Вызывает обработчики события 'event', передавая 'arg1' и 'arg2' как аргументы

// 7. eventNames()
// Возвращает массив имен всех зарегистрированных событий. Полезно для проверки, какие события в данный момент зарегистрированы.
// Пример:
const events = emitter.eventNames(); // Возвращает массив всех имен событий
console.log(events);

// 8. getMaxListeners()
// Возвращает текущее максимальное количество слушателей, которое разрешено для одного события. По умолчанию это 10.
// Пример:
const maxListeners = emitter.getMaxListeners(); // Возвращает текущее значение maxListeners
console.log(maxListeners);

// 9. setMaxListeners(n)
// Устанавливает максимальное количество слушателей для одного события. Полезно для предотвращения утечек памяти.
// Пример:
emitter.setMaxListeners(20); // Устанавливает максимальное количество слушателей на событие равным 20

// 10. listenerCount(eventName)
// Возвращает количество слушателей для указанного события. Этот метод может быть полезен для отладки и мониторинга событий.
// Пример:
const count = emitter.listenerCount('event'); // Возвращает количество слушателей для события 'event'
console.log(count);

// 11. prependListener(eventName, listener)
// Регистрация обработчика события, который будет вызван первым среди всех слушателей этого события. 
// Это метод похож на `on`, но добавляет обработчик в начало очереди обработчиков.
// Пример:
emitter.prependListener('event', () => {
  console.log('first listener');
});

// 12. prependOnceListener(eventName, listener)
// Регистрация одноразового обработчика события, который будет вызван первым среди всех слушателей этого события.
// Пример:
emitter.prependOnceListener('event', () => {
  console.log('first listener, only once');
});

// 13. rawListeners(eventName)
// Возвращает массив всех необработанных слушателей для указанного события. Это низкоуровневый метод и не рекомендуется для повседневного использования.
// Пример:
const listeners = emitter.rawListeners('event'); // Возвращает массив необработанных слушателей для события 'event'
console.log(listeners);

// Пример создания и использования EventEmitter:
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  console.log('An event occurred!');
});

myEmitter.emit('event'); // Вывод: An event occurred!

// Итог:
// Класс EventEmitter предоставляет обширный набор методов для управления событиями в Node.js.
// Эти методы позволяют вам создавать события, добавлять и удалять обработчики, и управлять процессом обработки событий.
