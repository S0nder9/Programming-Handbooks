// Глава 5: Стилизация компонентов

// Динамические стили и CSS модули

// Динамические стили позволяют изменять стили компонентов в зависимости от состояния или свойств компонента.
// CSS модули предоставляют возможность локальной области видимости стилей для компонентов, 
// изолируя их от глобальных стилей и предотвращая конфликты имен.

// Шаг 1: Установка CSS модулей

// Для использования CSS модулей в React приложении сначала нужно установить необходимые зависимости.
// Для этого воспользуйтесь менеджером пакетов npm или yarn:
// npm install --save-dev css-loader style-loader
// или
// yarn add --dev css-loader style-loader

// Шаг 2: Создание CSS модулей

// Создайте файл стилей для компонента, например, MyComponent.module.css.
// В этом файле определите стили для вашего компонента.

// MyComponent.module.css
// .container {
//     background-color: #f0f0f0;
//     padding: 20px;
//     border-radius: 5px;
// }

// Шаг 3: Импорт и использование CSS модулей в компоненте

// Импортируйте стили из CSS модуля в ваш компонент.

import React from 'react';
import styles from './MyComponent.module.css'; // Импорт CSS модуля

const MyComponent = ({ isActive }) => {
    // Определение динамических классов в зависимости от свойств компонента
    const containerClass = isActive ? styles.containerActive : styles.container;

    return (
        <div className={containerClass}>
            <h2>My Component</h2>
            <p>This is my component.</p>
        </div>
    );
};

export default MyComponent;

// В этом примере используется CSS модуль MyComponent.module.css, который определяет классы container и containerActive.
// В зависимости от свойства isActive, выбирается соответствующий класс для контейнера компонента.
