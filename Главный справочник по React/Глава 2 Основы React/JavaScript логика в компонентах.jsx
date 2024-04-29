// Глава 2: Основы React

// JavaScript логика в компонентах с датой

// Импортируем библиотеку React
import React, { useState } from 'react';

// Компонент, который отображает текущую дату и время
const DateTimeComponent = () => {
    // Состояние для хранения текущей даты и времени
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    // Функция для обновления текущей даты и времени
    const updateDateTime = () => {
        setCurrentDateTime(new Date()); // Устанавливаем новое значение текущей даты и времени
    };

    // Вызываем функцию updateDateTime каждую секунду для обновления текущей даты и времени
    setInterval(updateDateTime, 1000);

    // Возвращаем JSX для отображения текущей даты и времени
    return (
        <div>
            <h1>Текущая дата и время:</h1>
            <p>{currentDateTime.toLocaleString()}</p>
        </div>
    );
};

// Экспортируем компонент DateTimeComponent
export default DateTimeComponent;
