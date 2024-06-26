// console в JavaScript - это объект, предоставляющий методы для вывода информации в консоль разработчика браузера. 
// Это полезный инструмент для отладки, тестирования и вывода информации о состоянии программы.

// console.log(): Используется для вывода информации в консоль.
console.log('Привет, мир!');

// console.error(): Используется для вывода ошибок в консоль.
console.error('Ошибка: Деление на ноль');

// console.warn(): Используется для вывода предупреждений в консоль.
console.warn('Внимание: Память исчерпана');

// console.info(): Используется для вывода информационных сообщений в консоль.
console.info('Информация: Сайт посещен миллион раз');

// console.debug(): Используется для вывода отладочной информации в консоль.
let x = 10;
console.debug('Отладка: Значение переменной x =', x);

// console.group() и console.groupEnd(): Используются для группировки сообщений в консоли.
console.group('Информация о пользователе');
console.log('Имя: John');
console.log('Возраст: 30');
console.groupEnd();

// console.table(): Используется для вывода массивов и объектов в виде таблицы.
let users = [
    { name: 'John', age: 30 },
    { name: 'Alice', age: 25 }
];
console.table(users);

// console.clear(): Используется для очистки содержимого консоли.
console.clear();
