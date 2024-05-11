// Глава 5: Стилизация компонентов

// Динамическое добавление CSS классов означает изменение классов элементов в зависимости от каких-либо условий или событий.

// В файле JSX вы можете динамически добавлять CSS классы, используя JavaScript выражения внутри атрибута className элемента.

// Например, допустим, у вас есть компонент Button, который должен менять свой стиль в зависимости от его состояния (например, активный или неактивный).

import React, { useState } from 'react';
import './Button.css'; // Подключаем файл стилей для компонента Button

function Button() {
  // Используем useState для хранения состояния кнопки (активна или нет)
  const [isActive, setIsActive] = useState(false);

  // Функция для переключения состояния кнопки
  const toggleButton = () => {
    setIsActive(!isActive);
  };

  // Создаем переменную, которая будет хранить строку с CSS классами кнопки
  // В зависимости от значения isActive, мы добавляем или убираем класс 'active'
  const buttonClasses = isActive ? 'button active' : 'button';

  return (
    <button className={buttonClasses} onClick={toggleButton}>
      Click me
    </button>
  );
}

export default Button;

// <div className={`form-control ${!isInputValid ? 'invalid' : ''}`}/>