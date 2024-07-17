// Глава 10: Модуль events - Передача значений параметров в слушателей событий в Node.js

// Модуль events в Node.js предоставляет интерфейс для работы с событиями.
// Это позволяет создавать, прослушивать и управлять событиями в приложении.
// Одной из возможностей модуля events является передача значений параметров в слушатели событий.

// Как работают события и слушатели:
// События создаются и генерируются с использованием объекта EventEmitter.
// Слушатели событий регистрируются для прослушивания и обработки определенных событий.

// Пример создания EventEmitter и регистрации слушателей:
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Регистрация слушателя для события 'greet'
myEmitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Генерация события 'greet' и передача значения параметра
myEmitter.emit('greet', 'Alice'); // Выведет: Hello, Alice!

// Передача нескольких параметров:
// Слушатели событий могут принимать несколько параметров, передаваемых при генерации события.

// Пример регистрации слушателя с несколькими параметрами:
myEmitter.on('userDetails', (name, age) => {
  console.log(`User: ${name}, Age: ${age}`);
});

// Генерация события 'userDetails' и передача нескольких параметров
myEmitter.emit('userDetails', 'Bob', 25); // Выведет: User: Bob, Age: 25

// Использование объекта EventEmitter для передачи параметров позволяет гибко управлять данными между различными частями приложения.

// Пример использования EventEmitter в более сложном сценарии:
class User extends EventEmitter {
  constructor(name, age) {
    super();
    this.name = name;
    this.age = age;
  }

  updateAge(newAge) {
    this.age = newAge;
    this.emit('ageUpdated', this.name, this.age);
  }
}

const user = new User('Charlie', 30);

// Регистрация слушателя для события 'ageUpdated'
user.on('ageUpdated', (name, age) => {
  console.log(`${name}'s age is now ${age}`);
});

// Обновление возраста пользователя и генерация события
user.updateAge(31); // Выведет: Charlie's age is now 31

// Итог:
// Модуль events в Node.js предоставляет мощный инструмент для работы с событиями.
// Передача значений параметров в слушатели событий позволяет гибко обрабатывать данные и взаимодействовать между различными частями приложения.
// Это упрощает организацию кода и улучшает взаимодействие между компонентами.
