/**
 * 001 - Знакомство с TypeScript
 * =============================
 * 
 * Краткий обзор TypeScript
 * -------------------------
 * TypeScript - это надмножество JavaScript, добавляющее статическую типизацию.
 * Он помогает избежать ошибок во время разработки и делает код более предсказуемым.
 */

// Простейший пример объявления переменных с типами в TypeScript:
let message: string = "Hello, TypeScript!";
console.log(message);

/**
 * Типы данных в TypeScript
 * ------------------------
 * TypeScript поддерживает основные примитивные типы:
 * - string (строка)
 * - number (число)
 * - boolean (логический тип)
 * - null и undefined
 * - any (любой тип, отключает проверку типов)
 * - void (используется в функциях, которые ничего не возвращают)
 * - object (объект)
 */

// Пример использования разных типов
let isDone: boolean = false;
let total: number = 42;
let userName: string = "Nikita";
let notSure: any = 5;
notSure = "Теперь это строка";

/**
 * Функции в TypeScript
 * --------------------
 * Можно указывать типы аргументов и возвращаемое значение.
 */
function greet(name: string): string {
    return `Привет, ${name}!`;
}

console.log(greet("TypeScript"));

/**
 * Интерфейсы и объекты
 * --------------------
 * Интерфейсы позволяют определять структуру объектов.
 */
interface User {
    id: number;
    name: string;
    isActive: boolean;
}

const user: User = {
    id: 1,
    name: "Nikita",
    isActive: true,
};

console.log(user);

/**
 * Классы в TypeScript
 * -------------------
 * TypeScript поддерживает классы с модификаторами доступа (public, private, protected).
 */
class Person {
    private age: number;
    
    constructor(public name: string, age: number) {
        this.age = age;
    }
    
    getAge(): number {
        return this.age;
    }
}

const person = new Person("Nikita", 25);
console.log(person.name); // Доступен, т.к. public
console.log(person.getAge()); // Доступен через метод

/**
 * Обобщенные (generic) типы
 * -------------------------
 * Позволяют создавать многоразовые компоненты с разными типами данных.
 */
function identity<T>(arg: T): T {
    return arg;
}

console.log(identity<string>("Привет"));
console.log(identity<number>(123));

/**
 * Заключение
 * ----------
 * TypeScript улучшает JavaScript, добавляя строгую типизацию и новые возможности.
 * Это делает код более понятным и надежным.
 */
