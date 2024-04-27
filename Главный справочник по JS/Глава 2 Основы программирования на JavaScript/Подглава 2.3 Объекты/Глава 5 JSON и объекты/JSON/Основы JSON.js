// Глава 5: JSON и объекты

// Подглава 5.1: Основы JSON

// Что такое JSON
/*
JSON (JavaScript Object Notation) - это легкий формат обмена данными, основанный на подмножестве синтаксиса JavaScript.
Он используется для представления структур данных, состоящих из пар ключ-значение, в виде текста. JSON часто используется для передачи данных между сервером и клиентом.
*/

// Синтаксис JSON
/*
Синтаксис JSON состоит из пар ключ-значение, разделенных двоеточием и заключенных в фигурные скобки. Ключи должны быть строками, а значения могут быть строками, числами, логическими значениями, массивами, объектами или null.
*/

// Пример синтаксиса JSON:
const jsonData = {
    "name": "John",
    "age": 30,
    "isStudent": false,
    "hobbies": ["reading", "coding"],
    "address": {
        "city": "New York",
        "country": "USA"
    },
    "isNull": null
};

// Преобразование объектов JavaScript в JSON
/*
Объекты JavaScript могут быть преобразованы в JSON с помощью метода JSON.stringify().
*/

// Пример преобразования объекта JavaScript в JSON:
const person = {
    name: "John",
    age: 30,
    hobbies: ["reading", "coding"]
};

const jsonPerson = JSON.stringify(person);
console.log(jsonPerson); // Выведет: {"name":"John","age":30,"hobbies":["reading","coding"]}
