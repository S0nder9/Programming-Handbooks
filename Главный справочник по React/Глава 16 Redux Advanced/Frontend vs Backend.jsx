// Глава 16: Redux Advanced

// Redux - это предсказуемый контейнер состояния для JavaScript приложений. В этой главе мы рассмотрим
// продвинутые концепции использования Redux, разберем разницу между frontend и backend состояниями, 
// а также как организовать хранилище в приложении.

// Frontend vs Backend состояние:
// В современных веб-приложениях состояние может быть разделено на состояние, управляемое на клиенте (frontend),
// и состояние, управляемое на сервере (backend).

// Frontend состояние: состояние, которое живет только в браузере пользователя. Например, состояние UI, формы и т.д.
// Backend состояние: состояние, которое хранится на сервере и может быть изменено различными клиентами. Например, данные пользователя, продукты и т.д.

// Хранилище (Store) в Redux:
// В Redux все состояние приложения хранится в одном единственном объекте store. 
// Store создается с помощью функции createStore(), и для его изменения используются экшены (actions) и редьюсеры (reducers).

// Пример создания хранилища и управления состоянием с помощью Redux:

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// Action Types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Actions
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

// React Component
const Counter = ({ count, increment, decrement }) => (
  <div>
    <h1>Counter: {count}</h1>
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>
  </div>
);

// Mapping state and dispatch to props
const mapStateToProps = state => ({
  count: state.count
});

const mapDispatchToProps = {
  increment,
  decrement
};

// Connecting React component to Redux store
const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

// App Component
const App = () => (
  <Provider store={store}>
    <ConnectedCounter />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// Итог:
// В этом примере мы создали простое Redux-приложение для управления счетчиком. Мы определили действия (actions) и редьюсер (reducer),
// создали хранилище (store) и подключили React-компонент к хранилищу с помощью функции connect из библиотеки react-redux.
// Это базовый пример, который демонстрирует основные концепции Redux. В более сложных приложениях состояние может быть
// разбито на несколько редьюсеров, а экшены могут включать асинхронные запросы к серверу.
