// Глава 2: Краткий курс по JavaScript - Классы

// В этой главе мы рассмотрим основы работы с классами в JavaScript.
// Классы являются удобным способом для создания объектов и организации кода в объектно-ориентированном стиле.

// Подглава 2.1: Определение классов
// Что такое классы в JavaScript?
// Классы в JavaScript - это синтаксический сахар для работы с функциями-конструкторами и прототипами.
// Они упрощают создание объектов и работу с их методами и свойствами.

// Синтаксис класса:
class Person {
  constructor(name, age) {
    this.name = name; // Свойство класса
    this.age = age;   // Свойство класса
  }

  greet() {
    // Метод класса
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

// Пример создания объекта класса Person и вызова метода greet():
const person1 = new Person('Alice', 30);
person1.greet(); // Выведет: Hello, my name is Alice and I am 30 years old.

// Подглава 2.2: Наследование классов
// Наследование позволяет создавать новые классы на основе существующих.

// Синтаксис наследования:
class Student extends Person {
  constructor(name, age, studentId) {
    super(name, age); // Вызов конструктора родительского класса
    this.studentId = studentId; // Новое свойство для класса Student
  }

  study() {
    console.log(`${this.name} is studying.`);
  }
}

// Пример создания объекта класса Student и вызова методов:
const student1 = new Student('Bob', 22, 'S12345');
student1.greet(); // Выведет: Hello, my name is Bob and I am 22 years old.
student1.study(); // Выведет: Bob is studying.

// Подглава 2.3: Геттеры и Сеттеры
// Геттеры и сеттеры позволяют управлять доступом к свойствам объектов.

// Пример использования геттеров и сеттеров:
class Rectangle {
  constructor(width, height) {
    this._width = width;   // Приватное свойство
    this._height = height; // Приватное свойство
  }

  get width() {
    return this._width; // Геттер для свойства width
  }

  set width(value) {
    if (value > 0) {
      this._width = value; // Сеттер для свойства width
    } else {
      console.log('Width must be greater than 0.');
    }
  }

  get height() {
    return this._height; // Геттер для свойства height
  }

  set height(value) {
    if (value > 0) {
      this._height = value; // Сеттер для свойства height
    } else {
      console.log('Height must be greater than 0.');
    }
  }

  get area() {
    return this._width * this._height; // Геттер для вычисления площади
  }
}

// Пример создания объекта класса Rectangle и использования геттеров и сеттеров:
const rectangle1 = new Rectangle(10, 5);
console.log(rectangle1.area); // Выведет: 50
rectangle1.width = 20;        // Установка нового значения ширины
console.log(rectangle1.area); // Выведет: 100

// Подглава 2.4: Статические методы и свойства
// Статические методы и свойства принадлежат классу, а не его экземплярам.

// Пример использования статических методов и свойств:
class MathUtility {
  static add(x, y) {
    return x + y; // Статический метод для сложения двух чисел
  }

  static PI = 3.14; // Статическое свойство PI
}

// Вызов статического метода и свойства:
console.log(MathUtility.add(5, 3));  // Выведет: 8
console.log(MathUtility.PI);        // Выведет: 3.14

// Подглава 2.5: Приватные свойства и методы
// Приватные свойства и методы доступны только внутри класса, где они объявлены.

// Пример использования приватных свойств и методов:
class Counter {
  #count = 0; // Приватное свойство

  increment() {
    this.#count++;
  }

  get count() {
    return this.#count;
  }
}

// Пример создания объекта класса Counter и использования приватных свойств и методов:
const counter1 = new Counter();
counter1.increment();
console.log(counter1.count); // Выведет: 1

// Приватные свойства и методы не могут быть доступными извне
// console.log(counter1.#count); // SyntaxError

// Подглава 2.6: Декораторы классов
// Декораторы являются экспериментальной функцией JavaScript для модификации классов и их методов.

// Пример использования декораторов (пока не является стандартом):
// Декораторы нужно включить через Babel или TypeScript для работы с ними.

function log(target, name, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args) {
    console.log(`Calling ${name} with`, args);
    return originalMethod.apply(this, args);
  };
}

class Person {
  @log
  greet(message) {
    console.log(message);
  }
}

const person2 = new Person();
person2.greet('Hello!'); // Выведет: Calling greet with [ 'Hello!' ] и затем: Hello!

// Итог:
// В этой главе мы рассмотрели основы классов в JavaScript, включая их определение, наследование, геттеры и сеттеры, 
// статические методы и свойства, приватные свойства и методы, а также декораторы классов.
// Эти концепции помогут вам создавать более структурированные и организованные программы на JavaScript.
