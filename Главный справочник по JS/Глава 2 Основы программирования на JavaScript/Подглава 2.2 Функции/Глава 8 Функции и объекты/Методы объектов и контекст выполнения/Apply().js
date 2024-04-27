// Подглава 8.2: Контекст выполнения apply()

// Метод apply() для управления контекстом выполнения
/*
Метод apply() - это встроенный метод JavaScript, который позволяет вызывать функцию с заданным контекстом выполнения и списком аргументов в виде массива.
Синтаксис:
function.apply(thisArg, [argsArray])
Где:
- thisArg - это значение, которое будет использоваться в качестве контекста выполнения внутри функции.
- argsArray - это массив аргументов, которые будут переданы в функцию.
*/

// Пример использования метода apply()
const person = {
    fullName: function(city, country) {
        console.log(this.firstName + " " + this.lastName + ", " + city + ", " + country);
    }
};

const person1 = {
    firstName: "John",
    lastName: "Doe"
};

const person2 = {
    firstName: "Anna",
    lastName: "Smith"
};

// Вызов функции fullName с контекстом выполнения person1
person.fullName.apply(person1, ["Oslo", "Norway"]); // Выведет: John Doe, Oslo, Norway

// Вызов функции fullName с контекстом выполнения person2
person.fullName.apply(person2, ["Paris", "France"]); // Выведет: Anna Smith, Paris, France

/*
В этом примере метод apply() используется для вызова функции fullName с разными контекстами выполнения (person1 и person2) 
и списками аргументов (город и страна).
*/