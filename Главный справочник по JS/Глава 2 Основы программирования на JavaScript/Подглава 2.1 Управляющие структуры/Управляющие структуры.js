// 1. Условные операторы (if-else)
const age = 18;
if (age >= 18) {
    console.log("Вы совершеннолетний");
} else {
    console.log("Вы несовершеннолетний");
}

// 2. Циклы (for, while, do-while)
for (let i = 0; i < 5; i++) {
    console.log("Итерация номер", i);
}

let counter = 0;
while (counter < 3) {
    console.log("Текущее значение счетчика:", counter);
    counter++;
}

let num = 0;
do {
    console.log("Число:", num);
    num++;
} while (num < 3);

// 3. Операторы переключения (switch)
const color = "красный";
switch (color) {
    case "красный":
        console.log("Вы выбрали красный цвет");
        break;
    case "зеленый":
        console.log("Вы выбрали зеленый цвет");
        break;
    default:
        console.log("Цвет не определен");
}

// 4. Операторы для работы с массивами и объектами
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(function(num) {
    console.log("Число:", num);
});

const person = {
    name: "Иван",
    age: 30,
    city: "Москва"
};
for (let key in person) {
    console.log(key + ":", person[key]);
}

// Класс представляющий человека
class PersonMain {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Привет, меня зовут ${this.name} и мне ${this.age} лет.`);
    }
}

// Промис, который возвращает случайное число
function getRandomNumber() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const randomNum = Math.floor(Math.random() * 10) + 1;
            if (randomNum % 2 === 0) {
                resolve(randomNum);
            } else {
                reject(new Error("Ошибка: число нечетное"));
            }
        }, 1000);
    });
}

// Использование класса Person и промиса
const personMain = new Person("Иван", 30);
person.greet();

getRandomNumber()
    .then(number => {
        console.log("Случайное четное число:", number);
    })
    .catch(error => {
        console.error(error.message);
    });


// Это лишь некоторые из управляющих структур в JavaScript. Их использование зависит от конкретной задачи.
