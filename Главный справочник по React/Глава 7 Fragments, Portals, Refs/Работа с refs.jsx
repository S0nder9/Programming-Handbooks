// Раздел 7: Работа с refs

// Работа с refs в React

// В React, refs используются для доступа к DOM-элементам или экземплярам компонентов напрямую. Это особенно полезно для управления фокусом, выделения текста или анимации.

// Создание ref
// Ref можно создать с помощью React.createRef() или через useRef() в функциональных компонентах.

import React, { useRef, useState } from 'react';

// Пример работы с refs для получения и вывода значения из input

function FormComponent() {
    const inputRef = useRef(null); // Создание ref для input
    const [name, setName] = useState(''); // Состояние для хранения значения из input

    const handleButtonClick = () => {
        setName(inputRef.current.value); // Обновление значения состояния при клике на кнопку
    };

    return (
        <>
            <h1>Welcome, {name || 'Guest'}</h1>
            <input
                ref={inputRef}
                type="text"
                placeholder="Enter your name"
            />
            <button onClick={handleButtonClick}>Set Name</button>
            <p>Please enter your name above and click the button.</p>
        </>
    );
}

export default FormComponent;
