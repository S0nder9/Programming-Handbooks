// Подглава 3.1: Итерация по массиву

// Методы forEach(), map(), filter(), reduce()
/*
В JavaScript существует несколько методов для итерации по элементам массива и выполнения операций над ними:
- forEach(): выполняет указанную функцию один раз для каждого элемента массива.
- map(): создает новый массив с результатом вызова указанной функции для каждого элемента массива.
- filter(): создает новый массив, содержащий все элементы, для которых указанная функция возвращает true.
- reduce(): применяет функцию к аккумулятору и каждому значению массива (слева направо), чтобы свести его к одному значению.
*/

// Примеры применения методов итерации по массиву:

// forEach():
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((num) => {
    console.log(num * 2);
});

// map():
const doubledNumbers = numbers.map((num) => {
    return num * 2;
});
console.log(doubledNumbers);

// filter():
const evenNumbers = numbers.filter((num) => {
    return num % 2 === 0;
});
console.log(evenNumbers);

// reduce():
const sum = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0);
console.log(sum);

// Применение для обхода и преобразования элементов
/*
Эти методы позволяют удобно обходить и преобразовывать элементы массива, выполняя определенные операции над каждым элементом. Они часто используются для работы с данными и выполнения различных операций над ними.
*/
