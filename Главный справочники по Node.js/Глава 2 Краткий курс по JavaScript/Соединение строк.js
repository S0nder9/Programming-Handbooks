// Глава 2: Краткий курс по JavaScript

// Соединение строк в JavaScript является базовой операцией для работы с текстовыми данными.

// 1. Использование оператора '+':
// Один из самых простых способов соединения строк — использование оператора '+'.

let str1 = 'Hello';
let str2 = 'World';
let result1 = str1 + ' ' + str2; // 'Hello World'

// Можно также соединять строки с другими типами данных, JS автоматически преобразует их в строки:
let num = 42;
let result2 = str1 + ' ' + num; // 'Hello 42'

// 2. Использование метода concat():
// Метод concat() объединяет две или более строк и возвращает новую строку.
let concatResult = str1.concat(' ', str2); // 'Hello World'

// 3. Шаблонные строки (Template Literals):
// Шаблонные строки предоставляют удобный способ для вставки переменных и выражений внутри строки с использованием `${}`.

let name = 'Alice';
let age = 30;
let templateString = `Hello, my name is ${name} and I am ${age} years old.`;
// 'Hello, my name is Alice and I am 30 years old.'

// Шаблонные строки позволяют многострочный текст без использования специальных символов:
let multilineString = `
  This is a
  multiline
  string
`;

// Важно помнить, что строки в JavaScript являются неизменяемыми, поэтому любые операции соединения строк создают новую строку.

// Примеры использования в файле .js:
console.log(result1);
console.log(result2);
console.log(concatResult);
console.log(templateString);
console.log(multilineString);

// Итог:
// Соединение строк — это основной инструмент для работы с текстовыми данными в JavaScript, и разные методы предоставляют разные способы управления этим процессом.
