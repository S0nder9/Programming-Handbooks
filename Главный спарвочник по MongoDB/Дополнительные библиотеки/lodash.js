// Глава 1: Дополнительные библиотеки - lodash

// Lodash — это современная библиотека JavaScript, которая предоставляет множество утилит для работы с массивами, объектами и функциями.
// Она позволяет значительно упростить и ускорить разработку, обеспечивая более читабельный и удобный код.

// Установка Lodash:
// Чтобы использовать Lodash в своем проекте, установите его через npm или yarn:
npm install lodash
// или
yarn add lodash

// Основные возможности Lodash:

// 1. Работа с массивами
// Lodash предоставляет множество функций для работы с массивами, таких как map, filter, reduce и другие.
// Пример использования метода map для преобразования массива:
const _ = require('lodash');

const numbers = [1, 2, 3, 4];
const doubled = _.map(numbers, num => num * 2);
console.log('Doubled numbers:', doubled); // [2, 4, 6, 8]

// 2. Работа с объектами
// Lodash упрощает работу с объектами, позволяя выполнять операции, такие как клонирование, слияние и получение значений.
// Пример слияния объектов:
const object1 = { a: 1, b: 2 };
const object2 = { b: 3, c: 4 };
const merged = _.merge(object1, object2);
console.log('Merged object:', merged); // { a: 1, b: 3, c: 4 }

// 3. Функции для работы с коллекциями
// Lodash предлагает функции для обработки коллекций, такие как find, filter и reject.
// Пример поиска элемента в массиве:
const users = [
  { user: 'John', age: 25 },
  { user: 'Jane', age: 30 }
];

const user = _.find(users, { age: 30 });
console.log('Found user:', user); // { user: 'Jane', age: 30 }

// 4. Кеширование результатов функций
// Lodash предоставляет возможность кеширования результатов функций, что позволяет избежать повторных вычислений.
// Пример использования функции memoize:
const heavyComputation = (num) => {
  console.log('Heavy computation for', num);
  return num * num; // пример тяжелых вычислений
};

const memoizedComputation = _.memoize(heavyComputation);
console.log(memoizedComputation(5)); // Heavy computation for 5
console.log(memoizedComputation(5)); // Использует кешированный результат

// 5. Работа с функциями
// Lodash позволяет создавать более читаемые и чистые функции с помощью методов, таких как throttle и debounce.
// Пример использования debounce для предотвращения частых вызовов функции:
const log = () => console.log('Function called!');

const debouncedLog = _.debounce(log, 1000);
debouncedLog(); // Вызов функции будет отложен на 1 секунду

// Итог:
// Lodash является мощной библиотекой, которая упрощает и ускоряет работу с данными в JavaScript.
// Используя Lodash, вы можете писать более чистый и удобочитаемый код, сокращая время разработки и уменьшая количество ошибок.
