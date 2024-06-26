// Подглава 2.2: Доступ к свойствам и методам объекта

// Доступ к свойствам через точечную нотацию
/*
Свойства объекта могут быть доступны через точечную нотацию, где указывается имя объекта, за которым следует точка и имя свойства.
*/
const person = {
    name: "John",
    age: 30,
    greet: function() {
        console.log("Привет, меня зовут " + this.name);
    }
};

console.log(person.name); // Выведет: John
person.greet(); // Вызов метода greet объекта person

// Доступ к свойствам через квадратные скобки
/*
Свойства объекта также могут быть доступны через квадратные скобки, где указывается имя объекта, за которым следует открывающая квадратная скобка, 
а внутри скобок указывается имя свойства в виде строки.
*/
console.log(person["name"]); // Выведет: John
const propertyName = "age";
console.log(person[propertyName]); // Выведет: 30

// Вызов методов объекта
/*
Методы объекта вызываются также, как и свойства, с помощью точечной нотации, но вместо значения свойства указывается круглые скобки, 
в которых передаются аргументы метода (если они есть).
*/
person.greet(); // Вызов метода greet объекта person
