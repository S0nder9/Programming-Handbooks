// Глава 2: Краткий курс по JavaScript - Объекты

// В JavaScript объекты являются фундаментальной частью языка и представляют собой коллекцию пар ключ-значение.
// Объекты используются для хранения и организации данных.

// Создание объектов:

// 1. Литеральная нотация:
const person = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    zip: '10001'
  },
  greet: function() {
    return `Hello, my name is ${this.name}.`;
  }
};

// 2. Использование конструктора Object():
const car = new Object();
car.make = 'Toyota';
car.model = 'Camry';
car.year = 2022;
car.drive = function() {
  return `Driving the ${this.make} ${this.model}.`;
};

// Доступ к свойствам объекта:

// - Через точечную нотацию:
console.log(person.name); // "John"

// - Через квадратные скобки (полезно для динамического доступа):
console.log(person['age']); // 30

// Вызов методов объекта:
console.log(person.greet()); // "Hello, my name is John."

// Итерация по свойствам объекта:

// 1. Цикл for...in:
for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}

// 2. Использование методов Object.keys(), Object.values(), Object.entries():
const keys = Object.keys(person);
const values = Object.values(person);
const entries = Object.entries(person);

console.log(keys);    // ["name", "age", "address", "greet"]
console.log(values);  // ["John", 30, {city: "New York", zip: "10001"}, function greet() {...}]
console.log(entries); // [["name", "John"], ["age", 30], ["address", {city: "New York", zip: "10001"}], ["greet", function greet() {...}]]

// Возврат функций из других функций:
function createPerson(name) {
  return {
    name,
    greet() {
      return `Hello, my name is ${this.name}.`;
    }
  };
}

const person1 = createPerson('Alice');
const person2 = createPerson('Bob');

console.log(person1.greet()); // "Hello, my name is Alice."
console.log(person2.greet()); // "Hello, my name is Bob."

// Объекты в JavaScript поддерживают динамическое добавление и удаление свойств и методов, что делает их мощным инструментом для структурирования данных и функциональности приложений.
