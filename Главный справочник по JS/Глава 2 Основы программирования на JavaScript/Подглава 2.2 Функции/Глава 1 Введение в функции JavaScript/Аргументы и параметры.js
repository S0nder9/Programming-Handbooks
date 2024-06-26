// Подглава 1.3: Аргументы и параметры

// Передача аргументов в функцию
function greet(name) {
    console.log("Привет, " + name + "!");
}

greet("Миша"); // Выведет: Привет, Миша!

/*
Аргументы - это значения, передаваемые в функцию при ее вызове. 
В примере выше, строка "Миша" является аргументом функции greet.
*/

// Значения параметров по умолчанию
function greetDefault(name = "гость") {
    console.log("Привет, " + name + "!");
}

greetDefault(); // Выведет: Привет, гость!
greetDefault("Саша"); // Выведет: Привет, Саша!

/*
Параметры функции могут иметь значения по умолчанию, которые используются, 
если функция вызывается без соответствующих аргументов. 
В примере выше, параметр name имеет значение по умолчанию "гость", 
которое будет использовано, если функция вызывается без аргумента.
*/

// Оператор расширения (spread operator)
function sum(x, y, z) {
    return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers)); // Выведет: 6

/*
Оператор расширения (spread operator), обозначаемый троеточием (...), 
позволяет распаковывать элементы массива и передавать их как аргументы в функцию. 
В примере выше, оператор ...numbers распаковывает массив numbers и передает его элементы 
как аргументы функции sum, что позволяет легко работать с переменным числом аргументов.
*/
