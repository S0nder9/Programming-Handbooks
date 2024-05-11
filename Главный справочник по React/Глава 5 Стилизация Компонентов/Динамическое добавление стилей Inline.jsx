// Глава 5: Стилизация компонентов

// Динамическое добавление стилей Inline

// Динамическое добавление стилей Inline означает применение стилей к элементам напрямую в их атрибуте style.
// Это может быть полезно, когда вам нужно изменять стили элемента динамически в зависимости от определенных условий.

// Пример:
import React, { useState } from 'react';

const MyComponent = () => {
  // Создаем состояние для хранения цвета фона
  const [backgroundColor, setBackgroundColor] = useState('white');

  // Функция для изменения цвета фона при клике на кнопку
  const changeBackgroundColor = () => {
    // Генерируем случайный цвет в формате HEX
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    // Устанавливаем новый цвет как часть состояния
    setBackgroundColor(randomColor);
  };

  return (
    <div>
      {/* Элемент div, к которому применяются стили */}
      <div 
        // Стили применяются динамически в атрибуте style
        style={{ backgroundColor: backgroundColor, padding: '20px' }}
      >
        Этот элемент имеет динамический цвет фона.
      </div>
      {/* Кнопка для изменения цвета фона */}
      <button onClick={changeBackgroundColor}>Изменить цвет</button>
    </div>
  );
};

export default MyComponent;
