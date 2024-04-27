// Подглава 3.1: Итерация по массиву

// Метод forEach()

// Пример массива:
const numbers = [1, 2, 3, 4, 5];

// Синтаксис метода forEach():
// array.forEach(callback(currentValue [, index [, array]])[, thisArg])

// callback - функция, которая будет вызвана для каждого элемента массива
// currentValue - текущий обрабатываемый элемент массива
// index (необязательный) - индекс текущего элемента массива
// array (необязательный) - сам массив, по которому происходит итерация
// thisArg (необязательный) - значение, используемое в качестве this при вызове функции callback

// Пример использования метода forEach():
numbers.forEach(function(num) {
    console.log(num);
});

// Результат:
// 1
// 2
// 3
// 4
// 5

// Применение метода forEach() для изменения элементов массива:
numbers.forEach(function(num, index, array) {
    array[index] = num * 2;
});

console.log(numbers); // Выведет: [2, 4, 6, 8, 10]
