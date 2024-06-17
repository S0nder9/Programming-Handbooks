// Глава 15: Основы Redux

// Redux — это предсказуемый контейнер состояния для JavaScript приложений.
// Он помогает управлять состоянием приложения, делая его поведение более предсказуемым и тестируемым.

// Основные концепции Redux:
// 1. Store — единый источник правды, который содержит состояние приложения.
// 2. Actions — объекты, описывающие изменения состояния.
// 3. Reducers — функции, которые определяют, как состояние изменяется в ответ на действия.

// Основные шаги работы с Redux:
// 1. Создание действий (actions)
// 2. Определение редьюсеров (reducers)
// 3. Создание хранилища (store)
// 4. Подключение хранилища к React-компонентам

// Установка необходимых пакетов:
// npm install redux react-redux

// Пример: Управление состоянием счетчика с использованием Redux

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Определение действий (actions)
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

// Определение редьюсера (reducer)
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

// Создание хранилища (store)
const store = createStore(counterReducer);

// Компонент Counter
function Counter() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Счетчик: {count}</h1>
      <button onClick={() => dispatch(increment())}>Увеличить</button>
      <button onClick={() => dispatch(decrement())}>Уменьшить</button>
    </div>
  );
}

// Компонент App
function App() {
  return (
    <div>
      <h1>Пример использования Redux</h1>
      <Counter />
    </div>
  );
}

// Подключение хранилища к React приложению
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// Итог:
// В этом примере мы рассмотрели основные шаги работы с Redux: определение действий и редьюсеров, создание хранилища и подключение его к React-компонентам.
// Redux помогает управлять состоянием приложения централизованно, делая его поведение более предсказуемым и легким для отладки.
