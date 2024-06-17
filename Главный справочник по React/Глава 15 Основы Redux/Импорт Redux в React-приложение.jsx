// Глава 15: Основы Redux

// Redux - это библиотека управления состоянием для JavaScript приложений. Она помогает управлять состоянием приложения в предсказуемом и централизованном месте.
// В React-приложениях Redux часто используется для управления глобальным состоянием, особенно в больших приложениях с множеством компонентов.

// Чтобы начать использовать Redux в React-приложении, нужно установить Redux и React-Redux:
// npm install redux react-redux

// Основные концепции Redux:
// 1. Store - центральное место для хранения состояния приложения.
// 2. Actions - объекты, которые описывают изменения состояния.
// 3. Reducers - функции, которые описывают, как состояние приложения изменяется в ответ на действия.

// Пример использования Redux в React-приложении:

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Action types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Action creators
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

// Reducer
const initialState = { count: 0 };

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

// Store
const store = createStore(counterReducer);

// Components
function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>React Redux Example</h1>
      <Counter />
    </div>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// Итог:
// В данном примере мы создаем простое приложение на React с использованием Redux для управления состоянием счетчика.
// 1. Создаем actions и reducer для управления состоянием счетчика.
// 2. Создаем store с помощью функции createStore и передаем в него reducer.
// 3. Используем компоненты Provider, useDispatch и useSelector из библиотеки react-redux для интеграции Redux с React.
// Это позволяет компонентам взаимодействовать с глобальным состоянием Redux через диспатчинг действий и выборку состояния из store.
