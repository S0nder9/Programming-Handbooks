// Глава 15: Основы Redux

// Redux — это библиотека для управления состоянием приложений JavaScript, которая часто используется с React.
// Она помогает предсказуемо управлять состоянием приложения, обеспечивая централизованное хранилище для всех данных приложения.

// React Context vs Redux:
// React Context — это встроанный механизм для передачи данных через дерево компонентов без необходимости прокидывать пропсы на каждом уровне.
// Redux — это сторонняя библиотека для более сложных случаев управления состоянием с концепцией единого источника истинного состояния (single source of truth).

// Основные различия:
// 1. React Context подходит для простых случаев, когда нужно передать данные вглубь дерева компонентов.
// 2. Redux подходит для более сложных случаев, когда требуется предсказуемое управление состоянием, отслеживание изменений состояния, возможность отката изменений и т.д.

// Пример использования React Context:
import React, { useContext, useReducer } from 'react';

// Создаем контекст
const MyContext = React.createContext();

// Компонент, использующий контекст
function MyComponent() {
  const contextValue = useContext(MyContext);

  return (
    <div>
      <h1>Значение из контекста: {contextValue}</h1>
    </div>
  );
}

// Главный компонент, предоставляющий значение контекста
function AppWithContext() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MyContext.Provider value={state.value}>
      <MyComponent />
    </MyContext.Provider>
  );
}

// Пример использования Redux:
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Действие
const increment = () => ({
  type: 'INCREMENT',
});

// Редьюсер
const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      return state;
  }
};

// Создаем Redux store
const store = createStore(reducer);

// Компонент, использующий Redux
function Counter() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Счетчик: {count}</h1>
      <button onClick={() => dispatch(increment())}>Увеличить</button>
    </div>
  );
}

// Главный компонент, предоставляющий Redux store
function AppWithRedux() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

// Итог:
// React Context и Redux решают схожие задачи управления состоянием, но предназначены для разных сценариев.
// React Context удобен для простых случаев, когда нужно передать данные через дерево компонентов.
// Redux подходит для более сложных случаев управления состоянием с предсказуемыми изменениями и дополнительными возможностями.
