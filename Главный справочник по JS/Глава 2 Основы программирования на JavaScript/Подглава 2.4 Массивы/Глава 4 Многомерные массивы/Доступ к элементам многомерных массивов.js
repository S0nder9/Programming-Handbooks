// Подглава 4.2: Доступ к элементам многомерных массивов

// Индексация элементов многомерных массивов:
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(matrix[0][1]); // Выведет: 2

// Обход элементов многомерных массивов с помощью циклов:
for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
        console.log(matrix[i][j]);
    }
}

// Или с использованием метода forEach():
matrix.forEach(row => {
    row.forEach(element => {
        console.log(element);
    });
});
