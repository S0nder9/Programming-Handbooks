// Глава 8: React Advanced - Побочные Эффекты, Reducers, Context

// Что такое useState vs useReducer
// useState и useReducer - это два хука React, используемых для управления состоянием компонентов. 
// Они позволяют компонентам сохранять и изменять свое состояние.

// Определение useState vs useReducer
// useState - это простой хук, который позволяет добавить локальное состояние в функциональный компонент.
// useReducer - это более мощный альтернативный хук, который позволяет управлять более сложными состояниями, используя функцию редуктора.

// Как создается, где используется
// useState создается путем вызова функции useState и передачи начального значения состояния.
// Он используется в компонентах, когда требуется добавить локальное состояние.
// useReducer создается путем вызова функции useReducer и передачи функции редуктора и начального состояния.
// Он часто используется в случаях, когда управление состоянием становится сложным, или когда состояние имеет структуру объекта.

// Актуально ли
// Использование useState и useReducer актуально и рекомендуется для управления состоянием в React-приложениях.

// Несколько примеров
import React, { useState, useReducer } from 'react';

// Пример использования useState
const CounterWithState = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <div>
      <p>Счетчик: {count}</p>
      <button onClick={increment}>Увеличить</button>
      <button onClick={decrement}>Уменьшить</button>
    </div>
  );
};

// Пример использования useReducer
const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

const CounterWithReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Счетчик: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Увеличить</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Уменьшить</button>
    </div>
  );
};

// Итог
// В зависимости от сложности состояния и управления им, можно выбрать между useState и useReducer.
// Оба хука являются актуальными и эффективными инструментами для работы с состоянием в React-приложениях.

export { CounterWithState, CounterWithReducer };
