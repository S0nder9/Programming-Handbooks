// Глава 3: Состояние и Работа с Событиями

// Состояние и события - Прослушивание ввода пользователя, event.target.value

// Когда пользователь взаимодействует с элементом ввода (например, текстовым полем или полем выбора), 
// браузер генерирует событие изменения (change event) или ввода (input event). 
// Эти события можно прослушивать и обрабатывать в React-компонентах.

// При обработке таких событий обычно требуется получить текущее значение элемента, 
// с которым пользователь взаимодействует. Это можно сделать, используя свойство value объекта события (event.target.value).

// Пример:

import React, { useState } from 'react';

function InputComponent() {
  // Создаем состояние для хранения текущего значения ввода
  const [inputValue, setInputValue] = useState('');

  // Обработчик события изменения значения ввода
  const handleInputChange = (event) => {
    // Получаем текущее значение ввода из объекта события
    const newValue = event.target.value;
    
    // Обновляем состояние значения ввода
    setInputValue(newValue);
  };

  return (
    <div>
      {/* Элемент ввода, связанный с состоянием inputValue */}
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleInputChange} 
      />
      {/* Вывод текущего значения ввода */}
      <p>Текущее значение ввода: {inputValue}</p>
    </div>
  );
}

export default InputComponent;
