// Подглава 6.2: Изменение объектов

// Неизменяемость объектов
/*
Неизменяемость объектов - это концепция, согласно которой объекты не изменяются после создания. Вместо этого создаются новые объекты с обновленными значениями.
*/

// Пример неизменяемости объектов:
const person = {
    name: "John",
    age: 30
};

// Создание нового объекта с обновленным значением
const updatedPerson = {
    ...person,
    age: 31
};

console.log(updatedPerson); // Выведет: { name: "John", age: 31 }

// Создание новых объектов на основе существующих
/*
Для создания новых объектов на основе существующих объектов можно использовать различные методы, такие как Object.assign(), spread оператор или методы массивов.
*/

// Пример создания новых объектов на основе существующих:
const originalObject = { a: 1, b: 2 };

// Использование spread оператора
const newObject1 = { ...originalObject, c: 3 };

// Использование Object.assign()
const newObject2 = Object.assign({}, originalObject, { c: 3 });

console.log(newObject1); // Выведет: { a: 1, b: 2, c: 3 }
console.log(newObject2); // Выведет: { a: 1, b: 2, c: 3 }

// Использование методов объектов для манипуляции данными
/*
Методы объектов, такие как Object.keys(), Object.values() и Object.entries(), могут быть использованы для манипуляции данными объекта.
*/

// Пример использования методов объектов для манипуляции данными:
const person2 = {
    name: "Alice",
    age: 25,
    city: "New York"
};

const keys = Object.keys(person2);
console.log(keys); // Выведет: ["name", "age", "city"]

const values = Object.values(person2);
console.log(values); // Выведет: ["Alice", 25, "New York"]

const entries = Object.entries(person2);
console.log(entries); // Выведет: [["name", "Alice"], ["age", 25], ["city", "New York"]]
