// Подглава 5.2: Методы массивов

// Метод filter()
/*
Метод filter() используется для фильтрации элементов массива на основе заданного условия и возвращает новый массив, содержащий только те элементы, для которых условие истинно.
*/

// Пример использования метода filter()
const numbers = [1, 2, 3, 4, 5];

// Фильтрация четных чисел
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // Выведет: [2, 4]

// Фильтрация чисел больше 2
const greaterThanTwo = numbers.filter(num => num > 2);
console.log(greaterThanTwo); // Выведет: [3, 4, 5]

/*
В этом примере метод filter() используется для фильтрации элементов массива numbers. 
Первый вызов filter() фильтрует четные числа, а второй - числа, большие чем 2. 
В обоих случаях результат фильтрации сохраняется в новом массиве.
*/
