// Глава 15: Основы Redux
// Подключение состояния с использованием Redux Toolkit

// Redux Toolkit - это официальная рекомендуемая библиотека для эффективной работы с Redux,
// которая упрощает создание и управление состоянием приложения.

// Основные шаги для подключения Redux Toolkit:
// 1. Установка библиотек
// 2. Создание среза (slice) состояния
// 3. Настройка хранилища (store)
// 4. Подключение хранилища к приложению
// 5. Использование состояния и действий в компонентах

// Установка библиотек
// npm install @reduxjs/toolkit react-redux

// Пример реализации

import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// 1. Создание среза (slice) состояния
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

// Экспортируем действия для использования в компонентах
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 2. Настройка хранилища (store)
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// 3. Подключение хранилища к приложению
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

// 4. Использование состояния и действий в компонентах
function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  return (
    <div>
      <h1>Счетчик: {count}</h1>
      <button onClick={() => dispatch(increment())}>Увеличить</button>
      <button onClick={() => dispatch(decrement())}>Уменьшить</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Увеличить на 5</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// Итог:
// Redux Toolkit значительно упрощает создание и управление состоянием в Redux.
// Он предоставляет удобные функции для создания срезов (slices) состояния, настройки хранилища (store) и подключения состояния к компонентам.
// В приведенном примере мы создали простой счетчик с действиями для увеличения, уменьшения и увеличения на заданное значение.
