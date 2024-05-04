// Глава 3: Состояние и Работа с Событиями

// Подглава 3.1: Работа с состоянием

// В React состояние является основным механизмом управления данными в компонентах.
// Состояние позволяет компонентам React изменять свое поведение в ответ на действия пользователя.

// Для работы с состоянием в React используется хук useState.
// Хук useState позволяет добавлять состояние в функциональные компоненты.

import React, { useState } from 'react'; // Импорт хука useState

// Пример компонента, использующего хук useState
const Counter = () => {
  // Хук useState позволяет добавлять состояние в функциональные компоненты React
  // Первый аргумент useState - начальное значение состояния, в данном случае 0
  // Второй аргумент - функция для обновления состояния
  const [count, setCount] = useState(0);

  // Функция для увеличения счетчика
  const increment = () => {
    // Функция setCount позволяет обновлять состояние
    // При вызове она принимает новое значение состояния
    // В данном случае мы увеличиваем счетчик на 1
    setCount(count + 1);
  };

  // Функция для уменьшения счетчика
  const decrement = () => {
    // При вызове setCount мы также можем передавать функцию
    // Эта функция получает предыдущее состояние и возвращает новое
    // Это важно при выполнении нескольких обновлений подряд
    // В данном случае мы уменьшаем счетчик на 1
    setCount((prevCount) => prevCount - 1);
  };

  // Возвращаем JSX компонента, который отображает счетчик и кнопки для увеличения и уменьшения
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;


// Идентичный код, но в JS:

function useState(initialValue) {
  let state = initialValue;

  const setState = (newValue) => {
    state = newValue;
    // Trigger re-rendering
    render();
  };

  return [state, setState];
}

// Counter component
function Counter() {

  const [count, setCount] = useState(0);

  const increment = () => {

    setCount(count + 1);
  };

  const decrement = () => {

    setCount(count - 1);
  };

  const render = () => {
    const root = document.getElementById('root');

    root.innerHTML = `
      <div>
        <h2>Counter: ${count}</h2>
        <button onclick="Counter.increment()">Increment</button>
        <button onclick="Counter.decrement()">Decrement</button>
      </div>
    `;
  };

  render();

  Counter.increment = increment;
  Counter.decrement = decrement;
}

Counter();