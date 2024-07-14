// Глава 7: Модули ES6 - Модули ES6 в NodeJS

// Модули ES6 (или ECMAScript 2015) предоставляют более современный способ организации и использования модулей в JavaScript.
// В Node.js также можно использовать модули ES6, начиная с версии 12 и выше.

// Основные особенности модулей ES6:
// - Использование ключевых слов `import` и `export` для импорта и экспорта модулей.
// - Возможность экспорта нескольких значений из одного модуля.
// - Статический анализ импортов и экспортов, что улучшает производительность и позволяет использовать Tree Shaking для удаления неиспользуемого кода.

// Пример экспорта и импорта с использованием модулей ES6:

// В файле myModule.js:
export const myFunction = () => {
  console.log('Hello from myFunction');
};

export const myValue = 42;

export default function defaultFunction() {
  console.log('This is the default export');
}

// В другом файле (например, main.js):
import defaultFunction, { myFunction, myValue } from './myModule.js';

myFunction(); // Выведет: Hello from myFunction
console.log(myValue); // Выведет: 42
defaultFunction(); // Выведет: This is the default export

// Импорт всего модуля целиком:
import * as myModule from './myModule.js';

myModule.myFunction(); // Выведет: Hello from myFunction
console.log(myModule.myValue); // Выведет: 42
myModule.default(); // Выведет: This is the default export

// Использование ES6 модулей в Node.js:
// В Node.js по умолчанию используется система модулей CommonJS. 
// Чтобы использовать модули ES6, нужно изменить расширение файлов на .mjs или установить тип "module" в package.json.

// Пример настройки package.json для использования модулей ES6:
{
  "type": "module"
}

// Или можно использовать расширение .mjs для файлов модулей ES6:
// myModule.mjs
export const myFunction = () => {
  console.log('Hello from myFunction');
};

// main.mjs
import { myFunction } from './myModule.mjs';

myFunction(); // Выведет: Hello from myFunction

// Итог:
// Модули ES6 предоставляют современные и мощные средства для организации кода.
// Они позволяют экспортировать и импортировать функции, объекты и значения, а также поддерживают статический анализ и Tree Shaking.
