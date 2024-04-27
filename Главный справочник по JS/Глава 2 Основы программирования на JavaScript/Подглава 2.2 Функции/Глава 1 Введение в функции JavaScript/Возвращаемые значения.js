// Подглава 1.4: Возвращаемые значения

// Использование return
function sum(x, y) {
    return x + y;
}

const result = sum(3, 4);
console.log(result); // Выведет: 7

/*
Ключевое слово return используется в функциях для возврата значения из функции. 
В примере выше, функция sum принимает два аргумента и возвращает их сумму с помощью оператора +.
*/

// Возвращение объектов из функций
function createPerson(name, age) {
    return {
        name: name,
        age: age
    };
}

const person = createPerson("Анна", 25);
console.log(person); // Выведет: { name: 'Анна', age: 25 }

/*
Функции могут возвращать любой тип данных, в том числе и объекты. 
В примере выше, функция createPerson принимает имя и возраст и возвращает объект, 
содержащий эти данные.
*/

// Возвращение функций из функций
function greet(language) {
    if (language === "english") {
        return function(name) {
            console.log("Hello, " + name + "!");
        };
    } else if (language === "spanish") {
        return function(name) {
            console.log("¡Hola, " + name + "!");
        };
    } else {
        return function(name) {
            console.log("Привет, " + name + "!");
        };
    }
}

const greetEnglish = greet("english");
greetEnglish("John"); // Выведет: Hello, John!

const greetSpanish = greet("spanish");
greetSpanish("Maria"); // Выведет: ¡Hola, Maria!

/*
Функции в JavaScript могут также возвращать другие функции. 
Это полезно, например, когда нужно выбрать, какая функция должна быть выполнена в зависимости от некоторых условий. 
В примере выше, функция greet возвращает функцию приветствия на определенном языке в зависимости от переданного аргумента.
*/
