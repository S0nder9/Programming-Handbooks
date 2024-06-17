// Глава 15: Основы Redux

// Redux — это библиотека для управления состоянием приложения. Она особенно полезна в крупных приложениях,
// где требуется централизованное хранилище для управления состоянием.

// Основные концепции Redux:
// 1. Store (хранилище) — объект, который хранит состояние приложения.
// 2. Actions (действия) — объекты, описывающие, что произошло.
// 3. Reducers (редюсеры) — функции, которые принимают текущее состояние и действие, и возвращают новое состояние.

// Использование Redux в классовых компонентах:

import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// Определяем начальное состояние
const initialState = {
  count: 0
};

// Определяем редюсер
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

// Создаем хранилище
const store = createStore(reducer);

// Определяем действия
const increment = () => ({
  type: 'INCREMENT'
});

const decrement = () => ({
  type: 'DECREMENT'
});

// Компонент-класс, который будет использовать состояние Redux
class Counter extends Component {
  render() {
    const { count, increment, decrement } = this.props;
    return (
      <div>
        <h1>Счетчик: {count}</h1>
        <button onClick={increment}>Увеличить</button>
        <button onClick={decrement}>Уменьшить</button>
      </div>
    );
  }
}

// Функция для маппинга состояния к пропсам
const mapStateToProps = state => ({
  count: state.count
});

// Функция для маппинга действий к пропсам
const mapDispatchToProps = {
  increment,
  decrement
};

// Создаем обертку для компонента Counter с помощью connect
const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

// Компонент App, который включает в себя Provider для передачи хранилища всем дочерним компонентам
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedCounter />
      </Provider>
    );
  }
}

export default App;

// Итог:
// В этом примере мы создали простое приложение с Redux, которое включает в себя:
// - создание хранилища (store),
// - определение действий (actions),
// - написание редюсера (reducer),
// - использование connect для связывания компонента с состоянием и действиями Redux.
// Это позволяет эффективно управлять состоянием приложения и упрощает масштабирование и поддержку кода.
