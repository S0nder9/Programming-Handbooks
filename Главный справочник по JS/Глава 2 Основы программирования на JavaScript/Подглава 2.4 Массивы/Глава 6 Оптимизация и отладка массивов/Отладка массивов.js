// Подглава 6.2: Отладка массивов

// Использование консоли разработчика для анализа массивов

// Пример 1: Вывод массива в консоль для анализа его содержимого
const numbers = [1, 2, 3, 4, 5];
console.log(numbers);

// Пример 2: Использование метода console.table() для отображения массива в виде таблицы
const users = [
    { name: 'John', age: 30 },
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 35 }
];
console.table(users);

// Вывод элементов массивов для проверки значений

// Пример 1: Вывод отдельных элементов массива для проверки их значений
const fruits = ['Apple', 'Banana', 'Orange'];
fruits.forEach((fruit, index) => {
    console.log(`Fruit at index ${index}: ${fruit}`);
});

// Пример 2: Использование метода console.dir() для вывода объектов массива
const people = [
    { name: 'John', age: 30 },
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 35 }
];
console.dir(people);
