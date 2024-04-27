// Подглава 4.2: Применение контекста выполнения

// Вызов методов объекта с различными контекстами
/*
Методы объекта могут вызываться с различными контекстами выполнения. Это позволяет передавать объекты в качестве контекста для методов других объектов.
*/

// Пример вызова методов объекта с различными контекстами:
const person = {
    name: "John",
    greet: function() {
        console.log("Привет, меня зовут " + this.name);
    }
};

const anotherPerson = {
    name: "Alice"
};

person.greet(); // Вызов метода с контекстом объекта person
person.greet.call(anotherPerson); // Вызов метода с контекстом объекта anotherPerson
person.greet.apply(anotherPerson); // То же самое, но с использованием метода apply()

// Изменение контекста выполнения с помощью call() и apply()
/*
Методы call() и apply() позволяют явно установить контекст выполнения для вызываемой функции. Разница между ними заключается в том, как они принимают аргументы: 
call() принимает список аргументов, в то время как apply() принимает массив аргументов.
*/

// Пример изменения контекста выполнения с помощью call() и apply():
function greet() {
    console.log("Привет, меня зовут " + this.name);
}

const person3 = {
    name: "Mike"
};

const person4 = {
    name: "Emily"
};

greet.call(person3); // Вызов функции greet с контекстом объекта person3
greet.apply(person4); // Вызов функции greet с контекстом объекта person4

// Проблемы контекста выполнения в колбэках
/*
Контекст выполнения в колбэках может быть потерян, если колбэк передается отдельно от объекта, к которому он относится.
Для сохранения контекста в колбэках используются методы bind(), call() или apply().
*/

// Пример потери контекста выполнения в колбэках:
const button = document.getElementById("myButton");

const obj = {
    message: "Кнопка была нажата",
    handleClick: function() {
        console.log(this.message);
    }
};

button.addEventListener("click", obj.handleClick); // Контекст будет потерян

// Пример решения проблемы с использованием bind():
button.addEventListener("click", obj.handleClick.bind(obj)); // Контекст сохранен
