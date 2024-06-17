// Глава 15: Основы Redux

// Redux — это библиотека управления состоянием для JavaScript приложений, чаще всего используемая с React.
// Она помогает управлять состоянием приложения более предсказуемо и централизованно.

// В Redux приложение состоит из следующих основных компонентов:
// 1. Store (хранилище) — централизованное место для хранения состояния приложения.
// 2. Actions (действия) — объекты, которые описывают, что произошло в приложении.
// 3. Reducers (редюсеры) — функции, которые описывают, как состояние приложения изменяется в ответ на действия.

// Разделение кода на слайсы (Slices):
// В Redux Toolkit, для удобства управления состоянием, состояние и редюсеры можно разделить на слайсы.

// Пример простого Redux приложения с использованием Redux Toolkit:

// Установка необходимых библиотек:
// npm install @reduxjs/toolkit react-redux

// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// export default store;

// features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// export default counterSlice.reducer;

// Counter.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './features/counter/counterSlice';

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Счетчик: {count}</h1>
      <button onClick={() => dispatch(increment())}>Увеличить</button>
      <button onClick={() => dispatch(decrement())}>Уменьшить</button>
      <button onClick={() => dispatch(incrementByAmount(2))}>Увеличить на 2</button>
    </div>
  );
}

// export default Counter;

// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Counter from './Counter';

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

// export default App;

// Итог:
// В этом примере мы создали простое Redux приложение с использованием Redux Toolkit. 
// Мы разделили код на слайсы для удобного управления состоянием и использовали React-Redux для подключения компонента к Redux.
// Этот подход делает управление состоянием более предсказуемым и централизованным.
