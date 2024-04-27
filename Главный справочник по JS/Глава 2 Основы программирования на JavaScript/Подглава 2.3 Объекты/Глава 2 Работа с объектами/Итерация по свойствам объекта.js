// Подглава 2.3: Итерация по свойствам объекта

// Использование цикла for...in
/*
Цикл for...in используется для перебора всех перечисляемых свойств объекта.
*/
const person = {
    name: "John",
    age: 30,
    city: "New York"
};

for (let key in person) {
    console.log(key + ": " + person[key]);
}
// Выведет:
// name: John
// age: 30
// city: New York

// Использование Object.keys(), Object.values() и Object.entries()
/*
Методы Object.keys(), Object.values() и Object.entries() позволяют получить массив ключей, значений или пар ключ-значение объекта соответственно.
*/
const keys = Object.keys(person);
console.log(keys); // Выведет: ["name", "age", "city"]

const values = Object.values(person);
console.log(values); // Выведет: ["John", 30, "New York"]

const entries = Object.entries(person);
console.log(entries); // Выведет: [["name", "John"], ["age", 30], ["city", "New York"]]

// Фильтрация и преобразование свойств объекта
/*
С помощью методов Object.keys(), Object.values() и Object.entries() можно фильтровать и преобразовывать свойства объекта.
*/
const filteredKeys = Object.keys(person).filter(key => key !== "age");
console.log(filteredKeys); // Выведет: ["name", "city"]

const transformedValues = Object.values(person).map(value => value.toUpperCase());
console.log(transformedValues); // Выведет: ["JOHN", "NEW YORK"]
