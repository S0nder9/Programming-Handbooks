// Глава 7: Модули ES6 - Опции импортов ES6 в Node.js

// В ES6 был введен новый стандарт модулей, который стал частью JavaScript.
// ES6-модули используют ключевые слова `import` и `export` для импорта и экспорта значений между файлами.
// В отличие от CommonJS, ES6-модули поддерживают как именованный экспорт, так и экспорт по умолчанию.

// Как работают ES6-модули:
// Чтобы экспортировать значения из модуля, используется ключевое слово `export`.
// Чтобы импортировать значения в другой модуль, используется ключевое слово `import`.

// Пример именованного экспорта и импорта:
export const myFunction = () => {
  console.log('Hello from myFunction');
};

export const myValue = 42;

// В другом файле можно импортировать эти значения с помощью `import`:
import { myFunction, myValue } from './myModule';
myFunction(); // Выведет: Hello from myFunction
console.log(myValue); // Выведет: 42

// Префикс `as` позволяет переименовывать импортируемые значения:
import { myFunction as importedFunction, myValue as importedValue } from './myModule';
importedFunction(); // Выведет: Hello from myFunction
console.log(importedValue); // Выведет: 42

// Экспорт по умолчанию:
// Экспорт по умолчанию используется, когда нужно экспортировать единственное значение или объект.
// Используется ключевое слово `default`.

const defaultExport = {
  name: 'John',
  age: 30,
};

export default defaultExport;

// В другом файле можно импортировать экспорт по умолчанию без фигурных скобок:
import importedDefault from './myModule';
console.log(importedDefault.name); // Выведет: John

// Импорт всех экспортов модуля с помощью `*`:
// Если нужно импортировать все экспортированные значения из модуля, можно использовать `import * as`.

import * as myModule from './myModule';
myModule.myFunction(); // Выведет: Hello from myFunction
console.log(myModule.myValue); // Выведет: 42
console.log(myModule.default.name); // Выведет: John

// Итог:
// ES6-модули предоставляют мощные возможности для организации и переименования импортов и экспортов.
// Используйте именованные экспорты и экспорт по умолчанию для более гибкого управления зависимостями в вашем коде.
// Префикс `as` позволяет переименовывать импортируемые значения, что особенно полезно для избежания конфликтов имен.





