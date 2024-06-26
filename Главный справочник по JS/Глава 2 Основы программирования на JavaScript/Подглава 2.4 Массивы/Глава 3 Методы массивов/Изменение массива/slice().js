// Подглава 3.3: Изменение массива

// Метод slice()

// Метод slice() возвращает новый массив, содержащий копию части исходного массива от начального до конечного индексов (не включая конечный индекс).

// Пример использования метода slice():
const arr = [1, 2, 3, 4, 5];

// Создаем копию массива, содержащую элементы с индекса 1 до индекса 3 (не включая 3)
const slicedArray = arr.slice(1, 3);

console.log(slicedArray); // Выведет: [2, 3]
/*Параметры метода slice():

Первый параметр start: Определяет индекс, с которого начинать копирование элементов. 
Если значение отрицательное, то отсчет начинается с конца массива (например, -1 будет означать последний элемент).
Второй параметр end: Определяет индекс элемента, до которого нужно скопировать. 
Метод slice() копирует элементы до указанного индекса, но не включая его. 
Если end не указан, то будут скопированы все элементы до конца массива. Если значение отрицательное, то отсчет начинается с конца массива.
*/