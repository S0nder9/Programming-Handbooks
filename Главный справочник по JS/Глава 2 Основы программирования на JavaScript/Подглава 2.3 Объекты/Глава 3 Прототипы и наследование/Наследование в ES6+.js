// Подглава 3.3: Наследование в ES6+

// Использование ключевого слова extends
/*
Ключевое слово extends используется для создания подкласса (наследника) на основе существующего класса (родителя).
*/

// Пример использования extends для наследования:
class Animal {
    constructor(name) {
        this.name = name;
    }

    sound() {
        console.log("...");
    }
}

class Dog extends Animal {
    // Подкласс Dog наследует свойства и методы родительского класса Animal
}

const dog = new Dog("Rex");
dog.sound(); // Выведет: ...

// Вызов конструктора родительского класса
/*
Для вызова конструктора родительского класса из конструктора подкласса используется метод super().
*/

// Пример вызова конструктора родительского класса:
class Cat extends Animal {
    constructor(name, color) {
        super(name); // Вызываем конструктор родительского класса с аргументом name
        this.color = color;
    }
}

const cat = new Cat("Whiskers", "gray");
console.log(cat.name); // Выведет: Whiskers

// Переопределение методов
/*
Методы родительского класса могут быть переопределены в подклассе с тем же именем, чтобы изменить их поведение.
*/

// Пример переопределения метода:
class Bird extends Animal {
    sound() {
        console.log("Tweet tweet!");
    }
}

const bird = new Bird("Sparrow");
bird.sound(); // Выведет: Tweet tweet!
