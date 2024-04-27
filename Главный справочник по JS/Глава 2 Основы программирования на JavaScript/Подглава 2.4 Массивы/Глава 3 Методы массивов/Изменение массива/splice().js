// Подглава 3.3: Изменение массива

// Метод splice()

// Метод splice() изменяет содержимое массива, удаляя существующие элементы и/или добавляя новые элементы в его место, и возвращает массив из удаленных элементов.

// Пример использования метода splice():
const arr = [1, 2, 3, 4, 5];

// Удаляем 2 элемента начиная с индекса 1 и вставляем 'a', 'b' в их место
const removedElements = arr.splice(1, 2, 'a', 'b'); 

console.log(arr); // Выведет: [1, 'a', 'b', 4, 5]
console.log(removedElements); // Выведет: [2, 3]
/*
Первый параметр start: Определяет индекс, с которого начинать удаление или вставку элементов. 
Если значение отрицательное, то отсчет начинается с конца массива (например, -1 будет означать последний элемент).
Второй параметр deleteCount: Определяет количество элементов, которые следует удалить. Если deleteCount равен 0 или отсутствует, ни один элемент не будет удален.
Последующие параметры: Определяют элементы, которые следует вставить вместо удаленных. Можно указывать любое количество элементов.
*/