// Глава 15: Основы Redux

// Redux - это библиотека для управления состоянием приложений на JavaScript.
// Она позволяет предсказуемо изменять состояние приложений и делает их более масштабируемыми и поддерживаемыми.

// Redux Provider - это компонент, который предоставляет хранилище Redux всем компонентам вашего приложения через контекст React.
// Он используется для обертывания корневого компонента вашего приложения, чтобы каждый компонент мог получить доступ к состоянию и методам Redux.

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Пример простого редьюсера
const initialState = {
  count: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

// Создание хранилища Redux
const store = createStore(reducer);

// Компонент Counter, который использует состояние и методы Redux
const Counter = () => {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Счетчик: {count}</h1>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Увеличить</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Уменьшить</button>
    </div>
  );
};

// Корневой компонент, обернутый в Provider
const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// Итог:
// Redux Provider используется для предоставления хранилища Redux всем компонентам приложения.
// Он оборачивает корневой компонент, обеспечивая доступ к состоянию и методам Redux всем дочерним компонентам.
