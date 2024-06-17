// Глава 15: Основы Redux

// Redux - это предсказуемый контейнер состояния для JavaScript приложений.
// Он помогает управлять состоянием приложения централизованно и предсказуемо.

// Основные концепции Redux:
// 1. Actions - объекты, описывающие изменение состояния.
// 2. Reducers - функции, определяющие, как изменяется состояние в ответ на actions.
// 3. Store - объект, который объединяет state, actions и reducers.

// Отправка Actions:
// Actions - это объекты с обязательным полем type, которое описывает тип действия, и необязательными полями с данными.
// Actions отправляются с помощью метода dispatch.

// Пример Actions:
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Action Creators - функции, возвращающие actions:
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

// Пример Reducer:
const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

// Создание Store:
import { createStore } from 'redux';

const store = createStore(counterReducer);

// useStore Hook:
// Хук useStore позволяет получить доступ к store из компонентов React.

import React from 'react';
import { Provider, useDispatch, useSelector, useStore } from 'react-redux';

const Counter = () => {
  const dispatch = useDispatch(); // Хук для отправки actions
  const count = useSelector((state) => state.count); // Хук для получения данных из state
  const store = useStore(); // Хук для получения доступа к store

  const handleIncrement = () => {
    dispatch(increment()); // Отправка action increment
    console.log('Current State:', store.getState()); // Вывод текущего состояния в консоль
  };

  const handleDecrement = () => {
    dispatch(decrement()); // Отправка action decrement
    console.log('Current State:', store.getState()); // Вывод текущего состояния в консоль
  };

  return (
    <div>
      <h1>Счетчик: {count}</h1>
      <button onClick={handleIncrement}>Увеличить</button>
      <button onClick={handleDecrement}>Уменьшить</button>
    </div>
  );
};

// Главный компонент приложения, оборачивающий приложение в Provider
const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

export default App;

// Итог:
// В этом примере мы рассмотрели основные концепции Redux: actions, reducers, store и использование хука useStore.
// Мы создали простой счетчик с действиями для увеличения и уменьшения значения, и подключили его к Redux store.
