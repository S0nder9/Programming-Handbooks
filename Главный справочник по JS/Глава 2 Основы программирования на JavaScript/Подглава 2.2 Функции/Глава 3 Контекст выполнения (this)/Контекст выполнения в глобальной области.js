// Подглава 3.2: Контекст выполнения в функциях

// Определение контекста выполнения в функциях
/*
Контекст выполнения в функциях определяет значение ключевого слова this внутри функции во время ее выполнения. 
В JavaScript контекст выполнения функции зависит от того, как она была вызвана.
*/

// Пример 1: Контекст выполнения в глобальной функции
function globalFunction() {
    console.log(this === window); // true в браузере
}

globalFunction(); // Вызов функции в глобальной области

/*
В этом примере контекст выполнения функции globalFunction в глобальной области ссылается на глобальный объект (window в браузере).
*/

// Пример 2: Контекст выполнения в методе объекта
const obj = {
    name: "Объект",
    greet() {
        console.log(`Привет, меня зовут ${this.name}.`);
    }
};

obj.greet(); // Выведет: Привет, меня зовут Объект.

/*
В этом примере контекст выполнения функции greet, вызванной как метод объекта obj, ссылается на сам объект obj, 
что позволяет получить доступ к его свойству name.
*/

// Изменение контекста с помощью методов call(), apply() и bind()

// Пример 3: Метод call()
function greet() {
    console.log(`Привет, меня зовут ${this.name}.`);
}

const person = {
    name: "Алекс"
};

greet.call(person); // Выведет: Привет, меня зовут Алекс.

/*
В этом примере метод call вызывается на функции greet с объектом person в качестве аргумента. 
Это позволяет установить контекст выполнения функции greet в объект person, 
так что ключевое слово this внутри функции ссылается на этот объект.
*/

// Пример 4: Метод apply()
function introduce(greeting, farewell) {
    console.log(`${greeting}, меня зовут ${this.name}. ${farewell}.`);
}

introduce.apply(person, ["Привет", "До свидания"]); // Выведет: Привет, меня зовут Алекс. До свидания.

/*
В этом примере метод apply вызывается на функции introduce с объектом person в качестве первого аргумента и массивом аргументов ["Привет", "До свидания"] в качестве второго аргумента. 
Это позволяет передать контекст выполнения функции introduce объекту person и передать аргументы greeting и farewell.
*/

// Пример 5: Метод bind()
function logName() {
    console.log(`Меня зовут ${this.name}.`);
}

const boundFunction = logName.bind(person);
boundFunction(); // Выведет: Меня зовут Алекс.

/*
В этом примере метод bind вызывается на функции logName с объектом person в качестве аргумента. 
Это создает новую функцию, в которой контекст выполнения связан с объектом person, 
так что при вызове этой новой функции ключевое слово this будет ссылаться на объект person.
*/
