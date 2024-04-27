// Подглава 8.2: Контекст выполнения call()

// Определение контекста выполнения в JavaScript
/*
Контекст выполнения (или просто контекст) в JavaScript определяет, как переменные и выражения получают доступ к объекту, к которому они относятся.
Контекстом выполнения является объект, в рамках которого выполняется текущий код.
Методы объектов и функции в JavaScript имеют свой контекст выполнения, который определяет значение ключевого слова this внутри них.
*/

// Изменение контекста выполнения с помощью метода call()
/*
Метод call() является одним из методов, которые можно использовать для явного изменения контекста выполнения функции.
Он позволяет вызывать функцию с указанием объекта, который будет использоваться в качестве контекста выполнения внутри этой функции.
Синтаксис вызова функции с помощью метода call(): func.call(thisArg, arg1, arg2, ...)
Где:
- thisArg - объект, который будет использоваться как контекст выполнения внутри функции.
- arg1, arg2, ... - аргументы, которые будут переданы в функцию.
*/

// Пример использования метода call() для изменения контекста выполнения
const person = {
    name: "John",
    greet: function() {
        console.log("Привет, меня зовут", this.name);
    }
};

const anotherPerson = {
    name: "Alice"
};

person.greet(); // Выведет: Привет, меня зовут John
person.greet.call(anotherPerson); // Выведет: Привет, меня зовут Alice

/*
В этом примере метод greet вызывается для объекта person. В первом случае контекстом выполнения является объект person, 
поэтому ключевое слово this внутри функции указывает на этот объект.
Во втором случае метод call() используется для вызова функции greet с контекстом выполнения, указанным в объекте anotherPerson. 
Это позволяет переопределить значение ключевого слова this внутри функции и вывести имя другого объекта.
*/