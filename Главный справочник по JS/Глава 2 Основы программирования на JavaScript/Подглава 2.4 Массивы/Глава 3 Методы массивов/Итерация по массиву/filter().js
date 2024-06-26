// Подглава 3.1: Итерация по массиву

// Метод filter()
/*
Метод filter() используется для создания нового массива, содержащего только те элементы исходного массива, для которых вызов указанной функции возвращает true.
*/

// Пример использования метода filter():
const numbers = [1, 2, 3, 4, 5];

// Фильтрация только четных чисел:
const evenNumbers = numbers.filter((num) => {
    return num % 2 === 0;
});

console.log(evenNumbers); // Выведет: [2, 4]
