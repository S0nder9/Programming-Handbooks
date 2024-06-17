// Глава 15: Основы Redux

// Redux - это библиотека для управления состоянием приложений JavaScript, часто используемая с React.
// Redux Toolkit - это официальный, рекомендуемый способ написания логики Redux. Он упрощает настройку, улучшает производительность и предотвращает ошибки.

// Основные концепции Redux:
// 1. Store - хранилище состояния приложения.
// 2. Action - объект, описывающий изменения в состоянии.
// 3. Reducer - функция, которая определяет, как изменяется состояние в ответ на action.
// 4. Dispatch - метод для отправки action в store.


// Установка Redux Toolkit:
// npm install @reduxjs/toolkit react-redux

import React from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Создание среза (slice) с помощью Redux Toolkit
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
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

// Экспорт действий для использования в компонентах
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Создание store с помощью configureStore
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Компонент Counter, использующий Redux
function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
    </div>
  );
}

// Главный компонент приложения, оборачиваем приложение в Provider для предоставления store
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;

// Итог:
// Redux Toolkit упрощает процесс настройки и использования Redux в приложениях.
// С его помощью можно создавать срезы (slices), которые объединяют действия и редьюсеры в одно целое.
// Это улучшает читаемость и упрощает управление состоянием.
// В данном примере показано, как создать простой счетчик с помощью Redux Toolkit.
