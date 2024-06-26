// Глава 2: Краткий курс по JavaScript - Переменные и типы

// Переменные и типы данных - это основополагающие концепции в JavaScript. 
// В этой главе мы рассмотрим, как объявлять переменные, типы данных, а также особенности их использования.

// Подглава 2.1: Объявление переменных
// В JavaScript переменные могут быть объявлены с помощью ключевых слов var, let и const.

// Объявление переменных с помощью var
var x = 10; // переменная x имеет значение 10
var y = 'Hello, world!'; // переменная y имеет строковое значение

// Объявление переменных с помощью let
let a = 5; // переменная a имеет значение 5
let b = true; // переменная b имеет логическое значение true

// Объявление переменных с помощью const
const pi = 3.14; // константа pi имеет значение 3.14
const greeting = 'Hello'; // константа greeting имеет строковое значение

// Подглава 2.2: Типы данных
// В JavaScript существует несколько основных типов данных: Number, String, Boolean, Object, null, undefined и Symbol.

// Числовые данные (Number)
let num1 = 42; // целое число
let num2 = 3.14; // дробное число

// Строковые данные (String)
let str1 = 'JavaScript'; // строка с одинарными кавычками
let str2 = "is awesome!"; // строка с двойными кавычками

// Логические данные (Boolean)
let isTrue = true; // логическое значение true
let isFalse = false; // логическое значение false

// Объекты (Object)
let person = {
  name: 'John',
  age: 30
}; // объект с двумя свойствами: name и age

// Массивы (Array)
let colors = ['red', 'green', 'blue']; // массив с тремя строковыми элементами

// Значение null
let emptyValue = null; // переменная, которая явно не содержит значения

// Значение undefined
let notAssigned; // переменная объявлена, но не инициализирована, поэтому имеет значение undefined

// Символы (Symbol)
let sym1 = Symbol('foo');
let sym2 = Symbol('bar'); // два уникальных символа

// Подглава 2.3: Динамическая типизация
// JavaScript является языком с динамической типизацией, что означает, что тип переменной может изменяться в ходе выполнения программы.

let dynamicVariable = 'I am a string';
console.log(typeof dynamicVariable); // "string"
dynamicVariable = 42;
console.log(typeof dynamicVariable); // "number"

// Подглава 2.4: Преобразование типов
// JavaScript автоматически преобразует типы данных в некоторых ситуациях. Мы можем также явно преобразовывать типы данных.

let stringValue = '123';
let numberValue = Number(stringValue); // явное преобразование строки в число
console.log(typeof numberValue); // "number"

let booleanValue = Boolean(stringValue); // явное преобразование строки в логическое значение
console.log(booleanValue); // true

let implicitNumber = '5' * 1; // неявное преобразование строки в число
console.log(implicitNumber); // 5

// Подглава 2.5: Константы и область видимости
// Константы, объявленные с помощью const, не могут быть переопределены. Переменные, объявленные с помощью let и const, имеют блочную область видимости.

const constantValue = 10;
// constantValue = 20; // Ошибка: Переменная constantValue не может быть переопределена

if (true) {
  let blockScopedVariable = 'I am block scoped';
  console.log(blockScopedVariable); // "I am block scoped"
}
// console.log(blockScopedVariable); // Ошибка: blockScopedVariable не определена за пределами блока

// Переменные, объявленные с помощью var, имеют функциональную область видимости.
function scopeTest() {
  if (true) {
    var functionScopedVariable = 'I am function scoped';
    console.log(functionScopedVariable); // "I am function scoped"
  }
  console.log(functionScopedVariable); // "I am function scoped"
}
scopeTest();

// Итог:
// В этой главе мы рассмотрели основы работы с переменными и типами данных в JavaScript. 
// Понимание этих концепций является ключом к написанию эффективного и корректного кода.
