// Глава 3: Состояние и Работа с Событиями
// Использование одного состояния для хранения данных формы

// Альтернативный способ использование состояния для хранения данных формы в виде объекта с состояниями, которые надо сохранять.

//  setUserInput({
//             ...userInput, // копируем предыдущее состояние
//             date: event.target.value // обновляем значение даты
//         });


import React, { useState } from 'react';

const YourComponent = () => {
    // Использование одного состояния для хранения данных формы
    const [userInput, setUserInput] = useState({
        name: "",
        amount: "",
        date: ""
    });

    // Обработчик изменения значения поля имени
    const nameChangeHandler = (event) => {
        // Обновляем состояние, используя распыление (spread) для предыдущего состояния и изменяем только нужное свойство
        setUserInput({
            ...userInput, // копируем предыдущее состояние
            name: event.target.value // обновляем значение имени
        });
    }

    // Обработчик изменения значения поля суммы
    const amountChangeHandler = (event) => {
        // Обновляем состояние, используя распыление (spread) для предыдущего состояния и изменяем только нужное свойство
        setUserInput({
            ...userInput, // копируем предыдущее состояние
            amount: event.target.value // обновляем значение суммы
        });
    }

    // Обработчик изменения значения поля даты
    const dateChangeHandler = (event) => {
        // Обновляем состояние, используя распыление (spread) для предыдущего состояния и изменяем только нужное свойство
        setUserInput({
            ...userInput, // копируем предыдущее состояние
            date: event.target.value // обновляем значение даты
        });
    }

    return (
        <form>
            <div>
                <label htmlFor="name">Name</label>
                {/* Поле ввода для имени с привязкой к обработчику события */}
                <input type="text" id="name" value={userInput.name} onChange={nameChangeHandler} />
            </div>
            <div>
                <label htmlFor="amount">Amount</label>
                {/* Поле ввода для суммы с привязкой к обработчику события */}
                <input type="text" id="amount" value={userInput.amount} onChange={amountChangeHandler} />
            </div>
            <div>
                <label htmlFor="date">Date</label>
                {/* Поле ввода для даты с привязкой к обработчику события */}
                <input type="text" id="date" value={userInput.date} onChange={dateChangeHandler} />
            </div>
        </form>
    );
}

export default YourComponent;
