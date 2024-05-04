// Глава 3: Состояние и Работа с Событиями

// Подглава 3.1: Обновление состояния, зависящего от предыдущего состояния

// Для обновления состояния, которое зависит от предыдущего состояния, в React можно использовать функцию обновления состояния вместо объекта состояния. 

// setUserInput((previousState) => {
//             return {
//                 ...previousState, // копируем предыдущее состояние
//                 name: event.target.value // обновляем значение поля "Название"
//             }
//         })

import React, { useState } from "react";
import "./CostForm.css";

// Компонент формы для ввода информации о расходах
const CostForm = () => {
    // Используем useState для хранения состояния формы
    // В этом примере у нас есть три поля: название, сумма и дата
    const [userInput, setUserInput] = useState({
        name: "",
        amount: "",
        date: ""
    });

    // Обработчик изменения поля "Название"
    const nameChangeHandler = (event) => {
        // Обновляем состояние, используя предыдущее состояние и новое значение
        setUserInput((previousState) => {
            return {
                ...previousState, // копируем предыдущее состояние
                name: event.target.value // обновляем значение поля "Название"
            }
        })
    }

    // Обработчик изменения поля "Сумма"
    const amountChangeHandler = (event) => {
        // Обновляем состояние, используя предыдущее состояние и новое значение
        setUserInput((previousState) => {
            return {
                ...previousState, // копируем предыдущее состояние
                amount: event.target.value // обновляем значение поля "Сумма"
            }
        })
    }

    // Обработчик изменения поля "Дата"
    const dateChangeHandler = (event) => {
        // Обновляем состояние, используя предыдущее состояние и новое значение
        setUserInput((previousState) => {
            return {
                ...previousState, // копируем предыдущее состояние
                date: event.target.value // обновляем значение поля "Дата"
            }
        })
    }

    // Возвращаем JSX элемент формы для ввода информации о расходах
    return (
        <form>
            <div className="new-cost__controls">
                {/* Поле для ввода названия */}
                <div className="new-cost__control">
                    <label>Название</label>
                    <input type="text" onChange={nameChangeHandler} value={userInput.name} />
                </div>

                {/* Поле для ввода суммы */}
                <div className="new-cost__control">
                    <label>Сумма</label>
                    <input type="number" min="0.01" step="0.01" onChange={amountChangeHandler} value={userInput.amount} />
                </div>

                {/* Поле для выбора даты */}
                <div className="new-cost__control">
                    <label>Дата</label>
                    <input type="date" min="2019-01-01" max="2024-12-31" onChange={dateChangeHandler} value={userInput.date} />
                </div>

                {/* Кнопка для отправки формы */}
                <div className="new-cost__actions">
                    <button type="submit">Добавить расход</button>
                </div>
            </div>
        </form>
    )
}

export default CostForm;
