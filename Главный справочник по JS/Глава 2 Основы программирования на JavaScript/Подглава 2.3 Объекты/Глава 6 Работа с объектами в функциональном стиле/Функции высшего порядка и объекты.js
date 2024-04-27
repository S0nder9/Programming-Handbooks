// Глава 6: Работа с объектами в функциональном стиле

// Подглава 6.1: Функции высшего порядка и объекты

// Понятие функций высшего порядка
/*
Функции высшего порядка - это функции, которые могут принимать другие функции в качестве аргументов и/или возвращать функции в качестве результатов.
*/

// Пример функции высшего порядка:
function applyOperation(operation, operand) {
    return operation(operand);
}

function double(x) {
    return x * 2;
}

const result = applyOperation(double, 5);
console.log(result); // Выведет: 10

// Применение функций высшего порядка к объектам
/*
Функции высшего порядка могут применяться к объектам для обработки их свойств и методов.
*/

// Пример применения функции высшего порядка к объектам:
const person = {
    name: "John",
    age: 30
};

function mapObject(obj, fn) {
    const mappedObj = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            mappedObj[key] = fn(obj[key]);
        }
    }
    return mappedObj;
}

function doubleValue(x) {
    if (typeof x === 'number') {
        return x * 2;
    }
    return x;
}

const doubledPerson = mapObject(person, doubleValue);
console.log(doubledPerson); // Выведет: { name: "JohnJohn", age: 60 }
