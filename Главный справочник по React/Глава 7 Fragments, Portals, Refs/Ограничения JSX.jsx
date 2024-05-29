// Раздел 7: Fragments, Portals, Refs

// Подраздел 7.1: Ограничения JSX

// Ограничения JSX
// JSX имеет некоторые ограничения, которые важно понимать при разработке React-приложений.

import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

// 1. Один корневой элемент
// В JSX каждый компонент должен возвращать один корневой элемент. Например, следующий код вызовет ошибку:

/*
return (
  <h1>Заголовок</h1>
  <p>Параграф</p>
);
*/

// Правильный способ:
function Example1() {
  return (
    <div>
      <h1>Заголовок</h1>
      <p>Параграф</p>
    </div>
  );
}

// 2. Недопустимые атрибуты
// JSX не поддерживает все атрибуты HTML. Некоторые атрибуты имеют другие имена, например className вместо class, htmlFor вместо for.

function Example4() {
  return (
    <div className="example">
      <label htmlFor="input">Метка</label>
      <input id="input" />
    </div>
  );
}

// 3. JavaScript-выражения в JSX
// В JSX можно использовать любые JavaScript-выражения, обернув их в фигурные скобки {}. Но нельзя использовать инструкции (if, for и т.д.).

function Example5() {
  const name = 'React';
  return (
    <div>
      <h1>Привет, {name}!</h1>
      {/* Это работает */}
      {name === 'React' && <p>Добро пожаловать в React!</p>}
      {/* Это вызовет ошибку */}
      {/* if (name === 'React') { <p>Добро пожаловать в React!</p> } */}
    </div>
  );
}

// 4. Комментарии в JSX
// Комментарии в JSX нужно оборачивать в фигурные скобки и писать в формате JavaScript-комментариев.

function Example6() {
  return (
    <div>
      <h1>Заголовок</h1>
      {/* Это комментарий */}
    </div>
  );
}