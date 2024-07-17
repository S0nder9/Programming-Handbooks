// Глава 10: Модуль events - Отключение слушателя для события в Node.js

// Модуль `events` в Node.js предоставляет возможности для работы с событиями и слушателями.
// Одной из важнейших функций этого модуля является возможность управления слушателями событий, включая их добавление и удаление.

// Как работает управление слушателями событий:
// В Node.js `EventEmitter` — это класс из модуля `events`, который позволяет создавать объекты, способные излучать и слушать события.
// С помощью `EventEmitter` можно добавлять обработчики событий с помощью метода `on` и удалять их с помощью метода `off` или `removeListener`.

// Пример использования `EventEmitter` для добавления и удаления слушателей событий:
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Функция-обработчик для события 'event'
const onEvent = () => {
  console.log('Событие произошло!');
};

// Добавляем слушателя для события 'event'
myEmitter.on('event', onEvent);

// Вызов события 'event' вызывает функцию-обработчик
myEmitter.emit('event'); // Выведет: Событие произошло!

// Теперь отключим слушателя события 'event'
myEmitter.off('event', onEvent);

// Попробуем снова вызвать событие 'event'
myEmitter.emit('event'); // Ничего не выведет, так как слушатель был удален

// Также можно использовать метод `removeListener` для удаления обработчика
myEmitter.removeListener('event', onEvent);

// Итог:
// Модуль `events` и класс `EventEmitter` предоставляют мощные возможности для работы с событиями в Node.js.
// Методы `on`, `off`, и `removeListener` позволяют добавлять и удалять слушателей для управления тем, как и когда обрабатываются события.
// Это делает управление событиями гибким и контролируемым в вашем приложении.


// Пример

const EventEmitter = require('events');

// Создаем новый экземпляр EventEmitter
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Определяем функцию-обработчик события
const onEventMain = () => {
  console.log('Событие произошло!');
};

// Добавляем слушателя для события 'event'
myEmitter.on('event', onEventMain);

// Вызов события 'event' вызывает функцию-обработчик
myEmitter.emit('event'); // Выведет: Событие произошло!

// Удаляем слушателя события 'event'
myEmitter.off('event', onEventMain);

// Попробуем вызвать событие 'event' снова
myEmitter.emit('event'); // Ничего не выведет, так как слушатель был удален

// Также можно удалить слушателя с помощью метода `removeListener`
myEmitter.removeListener('event', onEventMain);

// Вызов события 'event' снова не выведет ничего
myEmitter.emit('event'); // Ничего не выведет
