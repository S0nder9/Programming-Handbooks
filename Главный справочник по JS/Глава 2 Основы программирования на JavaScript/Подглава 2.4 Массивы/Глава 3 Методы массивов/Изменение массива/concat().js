// Подглава 3.3: Изменение массива

// Метод concat()

// Метод concat() объединяет два или более массива, создавая новый массив, который содержит элементы всех указанных массивов.

// Пример использования метода concat():
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];

// Объединяем три массива в один
const concatenatedArray = arr1.concat(arr2, arr3);

console.log(concatenatedArray); // Выведет: [1, 2, 3, 4, 5, 6]
/*
Метод concat() принимает один или более аргументов - массивов или значения, которые нужно добавить к исходному массиву. 
Он создает новый массив, включающий все элементы исходного массива, за которыми следуют элементы из других массивов или значения. 
Исходный массив остается неизменным.
*/