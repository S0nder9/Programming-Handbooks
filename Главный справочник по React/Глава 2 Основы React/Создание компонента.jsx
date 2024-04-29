// Глава 2: Основы React

// Создание компонента

// Чтобы создать компонент в React, вы можете использовать функциональные или классовые компоненты.
// В этом примере мы создадим функциональный компонент.

// Импортируем библиотеку React
import React from 'react';

// Определяем функциональный компонент MyComponent
// Имя компонента обычно начинается с заглавной буквы.
// Функциональные компоненты принимают props в качестве параметра и возвращают JSX-элемент.
function MyComponent(props) {
    // Возвращаем JSX-разметку, описывающую внешний вид компонента
    return (
        <div>
            <h1>Hello, {props.name}!</h1>
            <p>This is a functional component.</p>
        </div>
    );
}

// Экспортируем компонент для использования в других частях приложения
export default MyComponent;

// Использование компонентов
import MyComponent from "./Components/Costitem";