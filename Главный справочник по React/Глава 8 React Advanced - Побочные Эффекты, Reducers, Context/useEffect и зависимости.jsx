// Глава 8: React Advanced - Побочные Эффекты, Reducers, Context

import React, { useReducer } from 'react';

// useReducer - это хук, который предназначен для управления состоянием компонента на основе редьюсера.
// Он принимает два аргумента:
// 1. Редьюсер (функция, которая принимает текущее состояние и действие, и возвращает новое состояние).
// 2. Начальное состояние.

// Редьюсер - это чистая функция, которая принимает текущее состояние и действие, и возвращает новое состояние.
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const UseReducerExample = () => {
  // Используем хук useReducer для управления состоянием
  // Изначальное состояние { count: 0 }
  // reducer - редьюсер, который будет обрабатывать действия
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <h1>Пример использования хука useReducer</h1>
      <p>Счетчик: {state.count}</p>
      {/* Кнопки для увеличения и уменьшения счетчика */}
      <button onClick={() => dispatch({ type: 'increment' })}>Увеличить счетчик</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Уменьшить счетчик</button>
    </div>
  );
};

export default UseReducerExample;

// В этом файле мы рассмотрели использование хука useReducer в React.
// Хук useReducer предоставляет более мощный способ управления состоянием компонента
// по сравнению с хуком useState, особенно для более сложных состояний и действий.
