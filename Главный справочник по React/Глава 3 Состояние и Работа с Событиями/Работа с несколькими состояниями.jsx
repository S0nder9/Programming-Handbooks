// Глава 3: Состояние и Работа с Событиями

// Работа с несколькими состояниями и event.target.value

// В React для работы с несколькими состояниями компонента используется хук useState,
// который позволяет объявить переменные состояния и их изменять.

import React, { useState } from 'react';

// Пример компонента, демонстрирующего работу с несколькими состояниями и event.target.value
function MultiStateComponent() {
  // Используем useState для объявления нескольких состояний
  const [name, setName] = useState(''); // Состояние для имени
  const [age, setAge] = useState(0); // Состояние для возраста

  // Обработчик изменения значения поля ввода имени
  const handleNameChange = (event) => {
    // event.target.value содержит текущее значение поля ввода
    const newName = event.target.value;
    // Обновляем состояние имени
    setName(newName);
  };

  // Обработчик изменения значения поля ввода возраста
  const handleAgeChange = (event) => {
    // event.target.value содержит текущее значение поля ввода
    const newAge = parseInt(event.target.value); // Преобразуем введенное значение в число
    // Обновляем состояние возраста
    setAge(newAge);
  };

  return (
    <div>
      {/* Поле ввода для имени */}
      <input
        type="text"
        value={name} // Значение из состояния name
        onChange={handleNameChange} // Обработчик изменения
        placeholder="Введите ваше имя"
      />
      {/* Поле ввода для возраста */}
      <input
        type="number"
        value={age} // Значение из состояния age
        onChange={handleAgeChange} // Обработчик изменения
        placeholder="Введите ваш возраст"
      />
      {/* Отображение текущего состояния */}
      <div>
        <p>Привет, {name}! Ваш возраст: {age} лет.</p>
      </div>
    </div>
  );
}

export default MultiStateComponent;
