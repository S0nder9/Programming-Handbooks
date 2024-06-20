// Глава 16: Redux Advanced

// В этой главе мы рассмотрим, как извлекать данные из хранилища Redux с использованием @reduxjs/toolkit.
// Redux Toolkit упрощает работу с Redux, предоставляя упрощенные методы для настройки хранилища, создания редьюсеров и экшенов.

// Основные шаги:
// 1. Установка и настройка Redux Toolkit.
// 2. Создание слайсов (slices).
// 3. Настройка хранилища (store).
// 4. Использование хуков useSelector и useDispatch для взаимодействия с хранилищем.

// Установка @reduxjs/toolkit и react-redux:
// npm install @reduxjs/toolkit react-redux

// Пример реализации:

// store.js - настройка хранилища
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// export default store;

// counterSlice.js - создание слайса для счетчика
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    reset: state => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;

// CounterComponent.jsx - компонент для отображения и управления счетчиком
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from './counterSlice';

function CounterComponent() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Счетчик: {count}</h1>
      <button onClick={() => dispatch(increment())}>Увеличить</button>
      <button onClick={() => dispatch(decrement())}>Уменьшить</button>
      <button onClick={() => dispatch(reset())}>Сбросить</button>
    </div>
  );
}

// export default CounterComponent;

// App.jsx - основной компонент приложения
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import CounterComponent from './CounterComponent';

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Пример с использованием Redux Toolkit</h1>
        <CounterComponent />
      </div>
    </Provider>
  );
}

// export default App;

// Итог:
// В этом примере мы создали простое приложение с счетчиком, используя @reduxjs/toolkit.
// Мы настроили хранилище, создали слайс для управления состоянием счетчика и использовали хуки useSelector и useDispatch для взаимодействия с хранилищем в компоненте.
// Этот подход упрощает работу с Redux и делает код более понятным и удобным для поддержки.
