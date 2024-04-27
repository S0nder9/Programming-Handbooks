// Подглава 4.2: Генерация HTML-разметки

// Использование циклов для создания динамического контента
// Циклы могут быть использованы для генерации HTML-разметки динамически на основе данных из массивов или других источников.

// Пример: генерация списка <ul> на основе элементов массива
function generateList(items) {
    let html = '<ul>';
    for (let item of items) {
        html += `<li>${item}</li>`;
    }
    html += '</ul>';
    return html;
}

const fruits = ['Apple', 'Banana', 'Orange'];
const fruitsList = generateList(fruits);
console.log(fruitsList);
// Выводит: <ul><li>Apple</li><li>Banana</li><li>Orange</li></ul>

// Пример: генерация таблицы <table> на основе двумерного массива
function generateTable(data) {
    let html = '<table>';
    for (let row of data) {
        html += '<tr>';
        for (let cell of row) {
            html += `<td>${cell}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    return html;
}

const tableData = [
    ['Name', 'Age', 'Country'],
    ['John', 30, 'USA'],
    ['Alice', 25, 'UK'],
    ['Bob', 35, 'Canada']
];
const dataTable = generateTable(tableData);
console.log(dataTable);
// Выводит:
// <table>
//   <tr><td>Name</td><td>Age</td><td>Country</td></tr>
//   <tr><td>John</td><td>30</td><td>USA</td></tr>
//   <tr><td>Alice</td><td>25</td><td>UK</td></tr>
//   <tr><td>Bob</td><td>35</td><td>Canada</td></tr>
// </table>

// Примеры генерации разметки
// - Создание динамических списков и таблиц на веб-страницах.
// - Генерация карточек товаров, новостей и других элементов интерфейса.
// - Формирование сложных макетов веб-страниц на основе данных из базы данных или API.
