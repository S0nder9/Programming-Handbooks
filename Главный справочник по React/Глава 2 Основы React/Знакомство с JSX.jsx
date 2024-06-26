// Глава 2: Основы React

// Знакомство с JSX

// JSX (JavaScript XML) - это расширение синтаксиса JavaScript, которое позволяет писать HTML-подобный код
// прямо внутри JavaScript. JSX делает код React более читаемым и понятным, улучшает его поддержку в IDE
// и помогает обнаруживать ошибки на раннем этапе.

// Пример:

import React from 'react';

// JSX-элементы выглядят как HTML-теги, но на самом деле это вызовы функций React.createElement().
// В этом примере создается простой компонент "Hello", который выводит приветственное сообщение.
const Hello = () => {
    return (
        <div>
            <h1>Hello, World!</h1>
            <p>This is a JSX component.</p>
        </div>
    );
};

// JSX позволяет использовать JavaScript выражения внутри фигурных скобок {}.
// Это позволяет вставлять переменные, вызывать функции и выполнять другие операции внутри JSX.
const Greeting = ({ name }) => {
    return <h2>Hello, {name}!</h2>;
};

// JSX также поддерживает использование атрибутов, как в обычном HTML.
// Атрибуты, которые представляют JavaScript выражения, должны быть заключены в фигурные скобки {}.
const App = () => {
    const userName = 'John';
    return (
        <div>
            <Hello />
            <Greeting name={userName} />
        </div>
    );
};

// JSX код компилируется в обычные вызовы функций React.createElement(),
// что позволяет React интерпретировать его как обычный JavaScript.
