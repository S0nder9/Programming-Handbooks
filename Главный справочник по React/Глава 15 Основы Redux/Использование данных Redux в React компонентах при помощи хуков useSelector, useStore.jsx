// Глава 15: Основы Redux

// Redux — это библиотека для управления состоянием в приложениях JavaScript, которая часто используется с React.
// Redux помогает централизованно управлять состоянием приложения и позволяет избежать "пропс-дриллинга".

// Основные концепции Redux:
// 1. Store — объект, который содержит состояние приложения.
// 2. Actions — объекты, описывающие изменения состояния.
// 3. Reducers — функции, которые определяют, как состояние изменяется в ответ на действия.

// Подключение Redux к React осуществляется через библиотеку react-redux, которая предоставляет хуки useSelector и useDispatch для работы с состоянием Redux.

// Пример использования Redux в React с хуками useSelector и useDispatch:

// 1. Установка необходимых библиотек:
// npm install redux react-redux

// 2. Создание Redux-хранилища (store.js):
import { createStore } from 'redux';

// Начальное состояние
const initialState = {
  count: 0
};

// Редуктор
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// Создание хранилища
const store = createStore(counterReducer);

export default store;

// 3. Создание компонент с использованием хуков (App.jsx):
import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store';

function Counter() {
  // Получение состояния с помощью useSelector
  const count = useSelector((state) => state.count);

  // Получение dispatch функции с помощью useDispatch
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Счетчик: {count}</h1>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Увеличить</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Уменьшить</button>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

// export default App;

// Описание:
// 1. В файле store.js создается хранилище Redux с начальным состоянием и редуктором.
// 2. В компоненте Counter используются хуки useSelector и useDispatch для работы с состоянием Redux:
//    - useSelector получает текущее значение состояния count из хранилища Redux.
//    - useDispatch возвращает функцию dispatch, которая используется для отправки действий в Redux.
// 3. Компонент App оборачивает Counter в провайдер Provider, предоставляющий хранилище Redux для всего дерева компонентов.

// Итог:
// Redux предоставляет мощные инструменты для управления состоянием в React-приложениях. Использование хуков useSelector и useDispatch
// позволяет легко интегрировать Redux в компоненты React, обеспечивая централизованное и предсказуемое управление состоянием.
