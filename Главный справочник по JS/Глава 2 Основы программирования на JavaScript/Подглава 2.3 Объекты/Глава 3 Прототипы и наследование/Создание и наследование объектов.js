// Подглава 3.2: Создание и наследование объектов

// Использование функции-конструктора
/*
Функция-конструктор в JavaScript используется для создания объектов с определенной структурой. 
Когда функция вызывается с оператором new, создается новый объект, который наследует свойства и методы из прототипа этой функции.
*/

// Пример использования функции-конструктора:
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function() {
    console.log("Привет, меня зовут " + this.name);
};

const john = new Person("John", 30);
john.greet(); // Выведет: Привет, меня зовут John

// Применение классов (ES6+)
/*
Классы в JavaScript представляют собой синтаксический сахар над функциями-конструкторами и прототипным наследованием.
Создание объектов и наследование происходит с использованием ключевых слов class, extends и super.
*/

// Пример использования классов:
class Animal {
    constructor(name) {
        this.name = name;
    }

    sound() {
        console.log("...");
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }

    sound() {
        console.log("Woof!");
    }
}

const dog = new Dog("Rex", "Labrador");
dog.sound(); // Выведет: Woof!

// Расширение прототипа объекта
/*
Прототип объекта может быть расширен путем добавления новых свойств и методов.
*/

// Пример расширения прототипа объекта:
Array.prototype.last = function() {
    return this[this.length - 1];
};

const arr = [1, 2, 3];
console.log(arr.last()); // Выведет: 3
