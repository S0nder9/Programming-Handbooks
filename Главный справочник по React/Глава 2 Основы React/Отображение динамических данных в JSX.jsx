// Глава 2: Основы React

// Отображение динамических данных в JSX

// Для отображения динамических данных в JSX в React используются фигурные скобки {}.

import React from 'react';

function App() {
    // Пример динамических данных
    const userName = 'John Doe';
    const userAge = 30;

    return (
        <div>
            {/* Использование фигурных скобок для вставки динамических данных в JSX */}
            <h1>Hello, {userName}!</h1>
            <p>You are {userAge} years old.</p>
        </div>
    );
}

export default App;

// В этом примере, значение переменной userName и userAge вставляются в JSX с помощью фигурных скобок,
// что позволяет отображать эти данные на веб-странице при рендеринге компонента.
