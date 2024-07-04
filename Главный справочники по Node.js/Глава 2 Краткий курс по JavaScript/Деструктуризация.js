// Глава 2: Краткий курс по JavaScript - Деструктуризация

// Деструктуризация — это синтаксическая особенность JavaScript, 
// позволяющая извлекать значения из массивов или свойства из объектов и 
// присваивать их переменным. Это делает код более читабельным и лаконичным.

// Подглава 2.1: Деструктуризация массивов

// Синтаксис деструктуризации массивов:
const numbers = [1, 2, 3, 4, 5];

// Деструктуризация массива
const [first, second, third] = numbers;

console.log(first);  // 1
console.log(second); // 2
console.log(third);  // 3

// Пропуск значений в массиве
const [one, , three] = numbers;
console.log(one);  // 1
console.log(three);  // 3

// Деструктуризация с остаточными элементами
const [firstElement, ...rest] = numbers;

console.log(firstElement); // 1
console.log(rest);        // [2, 3, 4, 5]

// Деструктуризация с значениями по умолчанию
const [a = 10, b = 20] = [1];
console.log(a); // 1
console.log(b); // 20

// Подглава 2.2: Деструктуризация объектов

// Синтаксис деструктуризации объектов:
const user = {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com'
};

// Деструктуризация объекта
const { name, age, email } = user;

console.log(name);  // Alice
console.log(age);   // 25
console.log(email); // alice@example.com

// Деструктуризация с переименованием переменных
const { name: userName, email: userEmail } = user;

console.log(userName);  // Alice
console.log(userEmail); // alice@example.com

// Деструктуризация с значениями по умолчанию
const { name = 'Unknown', country = 'USA' } = user;

console.log(name);    // Alice
console.log(country); // USA

// Деструктуризация вложенных объектов
const profile = {
  name: 'Bob',
  address: {
    city: 'New York',
    zip: '10001'
  }
};

// Деструктуризация вложенного объекта
const { address: { city, zip } } = profile;

console.log(city); // New York
console.log(zip);  // 10001

// Подглава 2.3: Деструктуризация в функциях

// Деструктуризация параметров функции
function printUserInfo({ name, age }) {
  console.log(`Name: ${name}, Age: ${age}`);
}

const userInfo = { name: 'Charlie', age: 30 };
printUserInfo(userInfo); // Name: Charlie, Age: 30

// Деструктуризация в функции с значениями по умолчанию
function createUser({ name = 'Guest', age = 18 } = {}) {
  return `Name: ${name}, Age: ${age}`;
}

console.log(createUser()); // Name: Guest, Age: 18
console.log(createUser({ name: 'Diana' })); // Name: Diana, Age: 18

// Подглава 2.4: Деструктуризация в комбинации с другими выражениями

// Деструктуризация в циклах
const data = [
  { id: 1, value: 'A' },
  { id: 2, value: 'B' },
  { id: 3, value: 'C' }
];

for (const { id, value } of data) {
  console.log(`ID: ${id}, Value: ${value}`);
}

// Деструктуризация в присваивании
let x, y;
[x, y] = [5, 10];

console.log(x); // 5
console.log(y); // 10

// Деструктуризация в возвращаемых значениях функций
function getCoordinates() {
  return [10, 20];
}

const [xCoord, yCoord] = getCoordinates();

console.log(xCoord); // 10
console.log(yCoord); // 20

// Деструктуризация в комбинации с rest-параметрами
const [firstItem, ...remainingItems] = [1, 2, 3, 4, 5];

console.log(firstItem);    // 1
console.log(remainingItems); // [2, 3, 4, 5]

// Деструктуризация вложенных массивов
const [firstValue, [secondValue, thirdValue]] = [1, [2, 3]];

console.log(firstValue);  // 1
console.log(secondValue); // 2
console.log(thirdValue);  // 3

// Подглава 2.5: Погружение в продвинутые темы деструктуризации

// Деструктуризация с использованием логических операторов
const { name: nameOrDefault = 'Unknown' } = {};
console.log(nameOrDefault); // Unknown

// Деструктуризация с использованием функции по умолчанию
const getDefaultProfile = () => ({ name: 'Default', age: 0 });

const { name, age } = getDefaultProfile();
console.log(name); // Default
console.log(age);  // 0

// Деструктуризация с массивами в объекте
const dataArray = {
  id: 1,
  info: ['Alice', 'Developer']
};

const { info: [nameFromArray, role] } = dataArray;

console.log(nameFromArray); // Alice
console.log(role);         // Developer

// Итог:
// Деструктуризация — это мощный инструмент в JavaScript, который упрощает извлечение данных из массивов и объектов.
// Знание различных способов применения деструктуризации улучшает читаемость кода и делает работу с данными более удобной и эффективной.
