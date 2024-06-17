// Глава 15: Основы Redux

// Redux - это предсказуемый контейнер состояния для JavaScript приложений. 
// Он помогает управлять состоянием приложения централизованно, что упрощает его отладку и тестирование.

// Redux Toolkit - это официальный, рекомендуемый способ написания логики Redux. 
// Он содержит набор инструментов для упрощения работы с Redux, таких как создание хранилища, редьюсеров и асинхронных операций.

// Основные понятия Redux:
// - Action (Действие): объект, описывающий изменение состояния.
// - Reducer (Редьюсер): функция, определяющая, как состояние приложения изменяется в ответ на действие.
// - Store (Хранилище): объект, который содержит состояние приложения и методы для работы с ним.
// - Dispatch (Отправка): метод для отправки действия в хранилище.
// - Selector (Селектор): функция для извлечения данных из состояния.

// Пример использования Redux Toolkit:

// Установка необходимых пакетов:
// npm install @reduxjs/toolkit react-redux

import React from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Создание среза (slice) с состоянием, редьюсером и действиями
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1,
    incrementByAmount: (state, action) => state + action.payload,
  },
});

// Извлечение действий из среза
const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Создание хранилища с помощью configureStore
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Компонент для отображения и управления состоянием счётчика
function Counter() {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter);

  return (
    <div>
      <h1>Счётчик: {count}</h1>
      <button onClick={() => dispatch(increment())}>Увеличить</button>
      <button onClick={() => dispatch(decrement())}>Уменьшить</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Увеличить на 5</button>
    </div>
  );
}

// Основной компонент приложения, который оборачивает приложение в Provider для предоставления доступа к хранилищу
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;

// Итог:
// Redux Toolkit упрощает настройку и использование Redux в приложении. Он предоставляет удобные методы для создания действий, редьюсеров и хранилища. 
// В этом примере показано, как создать простое приложение с использованием Redux Toolkit для управления состоянием счётчика.
