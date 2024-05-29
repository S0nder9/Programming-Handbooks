// Глава 8: React Advanced - Побочные Эффекты, Reducers, Context
// Тема: Использование хука useReducer
// Определение: Хук useReducer в React предоставляет альтернативный способ управления состоянием компонента, основанный на концепции редукторов (reducers) из Redux. Он позволяет более явно управлять изменениями состояния, особенно в случаях, когда состояние имеет сложную структуру или требует выполнения множества действий.

// Как создается: Хук useReducer принимает два аргумента - редуктор (функцию) и начальное состояние. Редуктор принимает текущее состояние и действие, и возвращает новое состояние. Он работает аналогично редукторам в Redux.

// Примеры:
import React, { useReducer } from 'react';

// Редуктор
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

// Компонент
const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
};

// Заключение: Хук useReducer предоставляет элегантный способ управления состоянием компонентов в React, основанный на принципах функционального программирования. Он особенно полезен при работе с состоянием, которое имеет сложную структуру или требует выполнения множества действий.
