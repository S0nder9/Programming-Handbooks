// Глава 3: Прототипы и наследование

// Подглава 3.1: Прототипы в JavaScript

// Что такое прототип в JavaScript
/*
Прототип в JavaScript - это механизм, который используется для наследования свойств и методов от других объектов.
Каждый объект в JavaScript имеет прототип, который является ссылкой на другой объект. Когда свойство не найдено в самом объекте,
JavaScript автоматически ищет его в прототипе этого объекта, а затем в прототипе прототипа и так далее, пока не будет найдено свойство или достигнут конец цепочки прототипов (null).
*/

// Пример демонстрирующий работу с прототипами:
const parent = {
    greet: function() {
        console.log("Привет!");
    }
};

const child = {};
child.__proto__ = parent;
child.greet(); // Выведет: Привет!

// Прототипное наследование
/*
Прототипное наследование в JavaScript позволяет объектам наследовать свойства и методы других объектов.
Это достигается путем установки прототипа для нового объекта на объект-прототип родительского объекта.
*/

// Пример наследования через установку прототипа:
function Parent() {}
Parent.prototype.greet = function() {
    console.log("Привет!");
};

function Child() {}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

const childObj = new Child();
childObj.greet(); // Выведет: Привет!

// Связь между объектом и его прототипом
/*
Каждый объект в JavaScript имеет прототип, который определяет его наследование. 
Прототип объекта доступен через свойство __proto__ или с помощью метода Object.getPrototypeOf().
*/

// Пример работы с прототипом объекта:
const obj = {};
console.log(obj.__proto__); // Выведет: {}
console.log(Object.getPrototypeOf(obj)); // Выведет: {}

// Проверка на принадлежность объекта к определенному прототипу
/*
Метод instanceof используется для проверки на принадлежность объекта к определенному прототипу.
*/

// Пример проверки принадлежности объекта к определенному прототипу:
console.log(obj instanceof Object); // Выведет: true
console.log(obj instanceof Array); // Выведет: false
