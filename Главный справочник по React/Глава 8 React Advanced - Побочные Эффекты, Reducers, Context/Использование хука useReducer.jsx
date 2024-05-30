// Глава 8: React Advanced - Побочные Эффекты, Reducers, Context
// Тема: Использование хука useReducer

import React, { useReducer } from 'react';

// Определение:
// Хук useReducer в React предоставляет альтернативный способ управления состоянием компонента, основанный на концепции редукторов (reducers) из Redux. 
// Он позволяет более явно управлять изменениями состояния, особенно в случаях, когда состояние имеет сложную структуру или требует выполнения множества действий.

// Структура хука useReducer:
// useReducer принимает два основных аргумента:
// 1. Редуктор (reducer) - функция, которая принимает текущее состояние и действие, и возвращает новое состояние.
// 2. Начальное состояние (initialState) - начальное значение состояния.
// useReducer возвращает массив с двумя элементами:
// 1. Текущее состояние.
// 2. Функция dispatch, которую можно использовать для отправки действий в редуктор.


// Сруктура хука useReducer

import React, { useReducer } from 'react';

// Определение редуктора (reducer):
// Редуктор - это функция, которая принимает текущее состояние и действие, и возвращает новое состояние.
// state - текущее состояние (в данном случае число)
// action - объект, описывающий действие, которое необходимо выполнить
const counterReducerMain= (state, action) => {
  // Обработка различных типов действий напрямую
  if (action.type === 'increment') {
    return state + 1;
  } else if (action.type === 'decrement') {
    return state - 1;
  } else {
    return state; // Возвращаем текущее состояние, если действие не распознано
  }
};

// Начальное состояние (initialState):
// Это значение состояния, с которого начинается работа редуктора (в данном случае 0)
const initialState = 0;

const CounterMain = () => {
  // Использование хука useReducer:
  // useReducer принимает два аргумента: редуктор и начальное состояние
  const [state, dispatch] = useReducer(counterReducerMain, initialState);

  // state - текущее состояние, управляемое редуктором (в данном случае число)
  // dispatch - функция для отправки действий в редуктор (например, увеличение или уменьшение значения)
  
  return (
    <div>
      <p>Счетчик: {state}</p>
      {/* Кнопка для увеличения значения */}
      <button onClick={() => dispatch({ type: 'increment' })}>Увеличить</button>
      {/* Кнопка для уменьшения значения */}
      <button onClick={() => dispatch({ type: 'decrement' })}>Уменьшить</button>
    </div>
  );
};

// export default CounterMain;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Пример 1: Счетчик с использованием useReducer

// Определение редуктора
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// Компонент Counter
const Counter = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
};

// Пример 2: Управление сложным состоянием формы

// Определение редуктора
const formReducer = (state, action) => {
  switch (action.type) {
    case 'updateField':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'reset':
      return action.initialState;
    default:
      return state;
  }
};

// Компонент Form
const Form = () => {
  const initialState = { name: '', email: '' };
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e) => {
    dispatch({ type: 'updateField', field: e.target.name, value: e.target.value });
  };

  const handleReset = () => {
    dispatch({ type: 'reset', initialState });
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        value={state.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={state.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button onClick={handleReset}>Reset</button>
      <p>Name: {state.name}</p>
      <p>Email: {state.email}</p>
    </div>
  );
};

// Пример 3: Асинхронные действия с useReducer

// Определение редуктора
const asyncReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_start':
      return { ...state, loading: true, error: null };
    case 'fetch_success':
      return { ...state, loading: false, data: action.data };
    case 'fetch_error':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

// Компонент FetchData
const FetchData = () => {
  const initialState = { loading: false, data: null, error: null };
  const [state, dispatch] = useReducer(asyncReducer, initialState);

  const fetchData = async () => {
    dispatch({ type: 'fetch_start' });
    try {
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      dispatch({ type: 'fetch_success', data });
    } catch (error) {
      dispatch({ type: 'fetch_error', error });
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {state.loading && <p>Loading...</p>}
      {state.data && <p>Data: {JSON.stringify(state.data)}</p>}
      {state.error && <p>Error: {state.error.message}</p>}
    </div>
  );
};

// Заключение:
// Хук useReducer предоставляет мощный и гибкий способ управления состоянием компонентов в React, особенно полезный для работы со сложными состояниями и логикой. Он позволяет разделить логику управления состоянием от компонента, делая код более чистым и поддерживаемым.

const App = () => (
  <div>
    <h1>React useReducer Examples</h1>
    <Counter />
    <Form />
    <FetchData />
  </div>
);

export default App;
