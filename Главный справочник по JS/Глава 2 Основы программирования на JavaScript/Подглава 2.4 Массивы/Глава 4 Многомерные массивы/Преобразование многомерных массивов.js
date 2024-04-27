// Подглава 4.3: Преобразование многомерных массивов

// Преобразование многомерных массивов в одномерные:
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const flattenedArray = matrix.flat();
console.log(flattenedArray); // Выведет: [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Преобразование одномерных массивов в многомерные:
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const chunkSize = 3;
const multiDimensionalArray = [];

for (let i = 0; i < array.length; i += chunkSize) {
    multiDimensionalArray.push(array.slice(i, i + chunkSize));
}

console.log(multiDimensionalArray); // Выведет: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
