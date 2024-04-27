// Объекты в JavaScript

// Объекты в JavaScript представляют собой составные типы данных, которые используются для хранения коллекций пар ключ-значение.

// Создание объекта с помощью литерала объекта:
let person = {
    name: 'John', // ключ 'name' с соответствующим значением 'John'
    age: 30, // ключ 'age' с соответствующим значением 30
    gender: 'male' // ключ 'gender' с соответствующим значением 'male'
};

// Доступ к свойствам объекта:
console.log(person.name); // выводит 'John'
console.log(person['age']); // альтернативный способ доступа к свойству объекта, выводит 30

// Изменение значения свойства объекта:
person.age = 35; // изменение значения свойства 'age'
console.log(person.age); // выводит 35

// Добавление нового свойства к объекту:
person.city = 'New York'; // добавление нового свойства 'city' с соответствующим значением 'New York'
console.log(person.city); // выводит 'New York'

// Удаление свойства объекта:
delete person.gender; // удаление свойства 'gender'
console.log(person.gender); // выводит 'undefined', так как свойство 'gender' больше не существует

// Объекты могут содержать другие объекты в качестве свойств:
let car = {
    brand: 'Toyota',
    model: 'Corolla',
    year: 2020,
    owner: {
        name: 'Alice',
        age: 25
    }
};

console.log(car.owner.name); // выводит 'Alice'

// Проход по свойствам объекта с помощью цикла for...in:
for (let key in person) {
    console.log(key + ': ' + person[key]);
}

// Объекты могут также содержать методы, которые являются функциями, определенными в контексте объекта:
let calculator = {
    add: function(a, b) {
        return a + b;
    },
    subtract: function(a, b) {
        return a - b;
    }
};

console.log(calculator.add(5, 3)); // вызов метода 'add', результат: 8
console.log(calculator.subtract(10, 4)); // вызов метода 'subtract', результат: 6

// Объекты в JavaScript (продолжение)

// В JavaScript объекты могут быть созданы не только с помощью литерала объекта, но и с использованием конструктора Object():
let person = new Object();
person.name = 'John';
person.age = 30;

// Конструктор Object также может принимать аргументы - ключи и значения объекта:
let person = new Object({ name: 'John', age: 30 });

// Объекты могут содержать вложенные объекты и массивы:
let complexObject = {
    prop1: {
        prop2: {
            prop3: [1, 2, 3]
        }
    }
};

console.log(complexObject.prop1.prop2.prop3[0]); // выводит 1

// В JavaScript все объекты являются экземплярами объекта Object, поэтому у них есть доступ к методам объекта Object:
let obj = {};

// Методы объекта Object:
console.log(Object.keys(obj)); // выводит массив ключей объекта
console.log(Object.values(obj)); // выводит массив значений объекта
console.log(Object.entries(obj)); // выводит массив массивов [ключ, значение] объекта
console.log(Object.getOwnPropertyNames(obj)); // выводит массив всех свойств объекта

// В JavaScript существует несколько способов клонирования объектов, например, с помощью Object.assign() или оператора spread:
let originalObject = { name: 'John', age: 30 };
let clonedObjectMain = Object.assign({}, originalObject); // клонирование с помощью Object.assign()

let clonedObject2 = { ...originalObjectMain }; // клонирование с помощью оператора spread

// Важно помнить, что при клонировании объектов с вложенными объектами или ссылками на другие объекты, будет создана поверхностная копия, а не глубокая.

// Объекты в JavaScript (продолжение)

// Удаление свойства объекта:
let person = { name: 'John', age: 30 };
delete person.age; // удаление свойства 'age'
console.log(person.age); // выводит 'undefined', так как свойство 'age' было удалено

// Глобальные объекты:
// В JavaScript существует несколько глобальных объектов, доступных в любом месте программы:
console.log(Math.PI); // доступ к свойству PI объекта Math

// Свойства глобальных объектов:
// Например, объект Math содержит различные математические свойства и методы:
console.log(Math.PI); // выводит число PI
console.log(Math.random()); // выводит случайное число между 0 и 1

// Методы объектов:
// В JavaScript методы - это функции, определенные в контексте объекта:
let calculatorMain = {
    add: function(a, b) {
        return a + b;
    },
    subtract: function(a, b) {
        return a - b;
    }
};

console.log(calculator.add(5, 3)); // вызов метода 'add', результат: 8
console.log(calculator.subtract(10, 4)); // вызов метода 'subtract', результат: 6

// Мутация объектов:
// Объекты в JavaScript являются изменяемыми, что означает, что их свойства можно изменять после создания объекта:
let person = { name: 'John', age: 30 };
person.age = 35; // изменение значения свойства 'age'
console.log(person.age); // выводит 35

// Мутирование копий объектов:
// При копировании объекта с помощью оператора присваивания создается ссылка на существующий объект, поэтому изменение свойства копии изменит и оригинальный объект:
let obj1 = { name: 'Alice', age: 25 };
let obj2 = obj1; // создание ссылки на объект obj1

obj2.age = 30; // изменение свойства объекта obj2

console.log(obj1.age); // выводит 30, так как объекты obj1 и obj2 ссылаются на один и тот же объект

// Объекты в JavaScript представляют собой мощный инструмент для организации данных и структур программ, они могут содержать свойства, методы и использоваться для описания сложных структур данных.

// Конец файла
