// Глава 8: React Advanced - Планирование состояний

// Планирование состояний
// Планирование состояний в React включает использование хуков, таких как useState и useReducer, для управления состоянием компонента.
// Правильное планирование состояний помогает создавать компоненты, которые легко читать, поддерживать и тестировать.

import React, { useState, useReducer } from 'react';

// Использование useState для планирования состояния
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

// Использование useReducer для планирования состояния
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

// Как создается, где используется
// Состояние создается с помощью хуков useState или useReducer в функциональных компонентах.
// useState используется для простых состояний, когда необходимо управлять одной переменной или объектом.
// useReducer подходит для более сложных состояний, которые включают несколько значений или требуют сложной логики обновления состояния.

const App = () => {
  return (
    <div>
      <h1>Примеры планирования состояний</h1>
      <h2>Счетчик с использованием useState:</h2>
      <CounterWithState />
      <h2>Счетчик с использованием useReducer:</h2>
      <CounterWithReducer />
    </div>
  );
};

// Актуально ли
// Планирование состояний является важной частью разработки React-приложений, так как правильное управление состоянием улучшает читаемость и тестируемость кода.
// Использование useState и useReducer помогает решать различные задачи по управлению состоянием в зависимости от их сложности.

export default App;
