// Глава 8: React Advanced - Побочные Эффекты, Reducers, Context
// Тема: Хуки useReducer и useEffect
// Определение:

// Хук useReducer:
// Хук useReducer в React предоставляет альтернативный способ управления состоянием компонента, основанный на концепции редукторов (reducers) из Redux. Он позволяет более явно управлять изменениями состояния, особенно в случаях, когда состояние имеет сложную структуру или требует выполнения множества действий.

// Пример использования useReducer:
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

// Хук useEffect:
// Хук useEffect в React позволяет выполнять побочные эффекты в функциональных компонентах, такие как загрузка данных, подписка на события или изменение DOM, после того как компонент отрисовался на экране. Он объединяет функциональность componentDidMount, componentDidUpdate и componentWillUnmount в одном хуке.

// Пример использования useEffect:
import React, { useState, useEffect } from 'react';

// Компонент
const ExampleComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Этот код будет выполнен после отрисовки компонента на экране
    fetchData(); // Предположим, что это функция для загрузки данных
  }, []); // Передаем пустой массив зависимостей, чтобы эффект выполнялся только после монтирования компонента

  return (
    <div>
      <p>Data: {data}</p>
    </div>
  );
};

// Заключение: Хуки useReducer и useEffect предоставляют мощные средства для управления состоянием и выполнения побочных эффектов в функциональных компонентах React. Используйте их с умом, чтобы создавать более эффективные и чистые компоненты.

// Глава 8 React Advanced - Побочные Эффекты, Reducers, Context Что такоеuseReducer и useEffect, напиши абсолютно все об этом в файле JSX, несколько примеров, пиши абсолютно все в JSX-файле