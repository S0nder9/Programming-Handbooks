// Ссылочные типы данных в JavaScript

// Ссылочные типы данных в JavaScript представляют собой объекты, которые хранятся в памяти и доступны по ссылке.

// 1. Объект (Object)
let obj = { name: 'John', age: 30 }; // Объявление объекта с помощью литерала объекта

// 2. Массив (Array)
let arr = [1, 2, 3, 4, 5]; // Объявление массива с помощью литерала массива

// 3. Функция (Function)
function greet(name) { // Объявление функции
    console.log('Привет, ' + name + '!');
}

// 4. Дата (Date)
let date = new Date(); // Создание объекта даты

// 5. Регулярное выражение (RegExp)
let pattern = /test/; // Создание регулярного выражения

// 6. Ссылка (Reference)
let objRef = obj; // Присвоение ссылки на объект
let arrRef = arr; // Присвоение ссылки на массив

// Примеры использования ссылочных типов данных:

// Объект
let person = { name: 'Alice', age: 25 };

// Массив
let numbers = [1, 2, 3, 4, 5];

// Функция
function multiply(a, b) {
    return a * b;
}

// Дата
let currentDate = new Date();

// Регулярное выражение
let regex = /test/;

// Ссылка
let anotherObjRef = obj; // Присвоение ссылки на объект
let anotherArrRef = arr; // Присвоение ссылки на массив
