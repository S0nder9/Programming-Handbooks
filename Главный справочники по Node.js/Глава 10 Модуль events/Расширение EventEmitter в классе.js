// Глава 10: Модуль events - Расширение EventEmitter в классе в Node.js

// В Node.js модуль events предоставляет возможность работать с событиями и подписчиками.
// Основой для работы с событиями является класс EventEmitter, который позволяет создавать, вызывать и обрабатывать события.

// Как работает EventEmitter:
// EventEmitter предоставляет методы для создания и управления событиями.
// Мы можем расширить EventEmitter, создавая свои классы и добавляя к ним функциональность работы с событиями.

// Пример создания и использования EventEmitter:
const EventEmitter = require('events');

// Создадим класс, который будет расширять EventEmitter
class MyEmitter extends EventEmitter {
  constructor() {
    super();
  }

  emitEvent() {
    console.log('Emitting event...');
    this.emit('event'); // Генерация события 'event'
  }
}

// Создадим экземпляр нашего класса
const myEmitter = new MyEmitter();

// Добавим слушатель события 'event'
myEmitter.on('event', () => {
  console.log('Event has been emitted!');
});

// Вызовем метод emitEvent, который сгенерирует событие
myEmitter.emitEvent(); // Выведет: Emitting event... и Event has been emitted!

// Мы также можем передавать данные вместе с событием
class DataEmitter extends EventEmitter {
  emitDataEvent(data) {
    this.emit('dataEvent', data); // Генерация события 'dataEvent' с передачей данных
  }
}

const dataEmitter = new DataEmitter();

dataEmitter.on('dataEvent', (data) => {
  console.log('Data received:', data);
});

dataEmitter.emitDataEvent({ key: 'value' }); // Выведет: Data received: { key: 'value' }

// Итог:
// Расширение EventEmitter позволяет создавать мощные и гибкие классы для работы с событиями в Node.js.
// Вы можете генерировать события, добавлять слушатели и передавать данные вместе с событиями,
// что делает этот подход полезным для создания масштабируемых и управляемых приложений.
