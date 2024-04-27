// Подглава 4.1: Обработка массивов

// Использование циклов для обхода элементов массива
// Циклы позволяют эффективно обрабатывать каждый элемент массива и выполнять над ним различные операции.

// Пример: вывод всех элементов массива с помощью цикла for
const numbers = [1, 2, 3, 4, 5];
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}

// Применение для поиска, фильтрации и трансформации данных
// Циклы могут быть использованы для реализации различных алгоритмов поиска, фильтрации и преобразования данных в массиве.

// Пример: поиск максимального числа в массиве
function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

console.log(findMax([3, 8, 2, 10, 5])); // Выводит 10

// Пример: фильтрация массива чисел, оставляющая только четные числа
function filterEvenNumbers(arr) {
    const result = [];
    for (let num of arr) {
        if (num % 2 === 0) {
            result.push(num);
        }
    }
    return result;
}

console.log(filterEvenNumbers([1, 2, 3, 4, 5])); // Выводит [2, 4]

// Пример: трансформация массива чисел, увеличивающая каждый элемент на 1
function incrementArray(arr) {
    const result = [];
    for (let num of arr) {
        result.push(num + 1);
    }
    return result;
}

console.log(incrementArray([1, 2, 3])); // Выводит [2, 3, 4]

// Примеры использования
// - Обработка данных форм.
// - Генерация динамического контента на веб-странице.
// - Решение задач в алгоритмах и структурах данных.
