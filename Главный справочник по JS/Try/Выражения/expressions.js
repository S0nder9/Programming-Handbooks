//Выражения в JS

//Выражения в JavaScript представляют собой фрагменты кода, 
//которые могут быть вычислены в значение. Они могут включать в себя переменные, операторы, значения и вызовы функций.
//Выражения могут быть частью других выражений или использоваться самостоятельно. Например, арифметические операции, 
//условные выражения, объявления функций, обращения к объектам и массивам,
//а также создание регулярных выражений - все это является примерами выражений в JavaScript.

// Арифметические выражения
let sum = 10 + 5; // 15
let difference = 10 - 5; // 5
let product = 10 * 5; // 50
let quotient = 10 / 5; // 2
let remainder = 10 % 3; // 1
let exponentiation = 10 ** 2; // 100

// Логические выражения
let x = 10;
let y = 5;
let isGreater = x > y; // true
let isEqual = x === y; // false
let isTrue = true && false; // false
let isFalse = true || false; // true
let notTrue = !true; // false

// Выражения присваивания
let a = 5;
let b = 10;
a += 2; // a = 7
b -= 3; // b = 7

// Условные выражения (тернарный оператор)
let age = 20;
let status = (age >= 18) ? 'adult' : 'minor'; // 'adult'

// Строковые выражения
let firstName = 'John';
let lastName = 'Doe';
let fullName = firstName + ' ' + lastName; // 'John Doe'

// Функциональные выражения
let multiply = function (a, b) {
    return a * b;
}
let result = multiply(5, 3); // 15

// Выражения объектов
let person = {
    name: 'John',
    age: 30,
    gender: 'male'
};
let personName = person.name; // 'John'

// Выражения массивов
let numbers = [1, 2, 3, 4, 5];
let firstNumber = numbers[0]; // 1

// Выражения регулярных выражений
let pattern = /test/;
let testResult = pattern.test('test string'); // true
