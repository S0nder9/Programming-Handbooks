// Глава 6: Оптимизация и отладка массивов

// Подглава 6.1: Оптимизация производительности

// Использование эффективных методов массивов

// Пример 1: Использование метода filter() вместо цикла for для фильтрации данных
const numbers = [1, 2, 3, 4, 5];

// Фильтрация четных чисел
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // Вывод: [2, 4]

// Пример 2: Использование метода map() для преобразования данных
const squares = numbers.map(num => num * num);
console.log(squares); // Вывод: [1, 4, 9, 16, 25]

// Избегание лишних операций с массивами

// Пример: Избегание лишних вызовов метода concat()
// Неоптимально
const newArray = [];
newArray.concat([1, 2, 3]);
newArray.concat([4, 5, 6]);
console.log(newArray); // Вывод: []

// Оптимально: Использование spread оператора или метода push()
const optimalArray = [];
optimalArray.push(...[1, 2, 3]);
optimalArray.push(...[4, 5, 6]);
console.log(optimalArray); // Вывод: [1, 2, 3, 4, 5, 6]
