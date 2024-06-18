// Глава 16: Redux Advanced
// В этой главе мы рассмотрим использование useEffect() в сочетании с Redux для выполнения PUT-запросов,
// используя @reduxjs/toolkit для управления состоянием хранилища.

// В этом примере мы создадим простое приложение для управления данными пользователя с возможностью
// обновления информации через PUT-запрос.

// Установите необходимые зависимости, если они еще не установлены:
// npm install @reduxjs/toolkit react-redux

import React, { useEffect } from 'react';
import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Создаем асинхронный thunk для выполнения PUT-запроса
const updateUser = createAsyncThunk('user/updateUser', async (userData) => {
  const response = await fetch(`https://api.example.com/user/${userData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to update user');
  }
  return response.json();
});

// Создаем slice для управления состоянием пользователя
const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Создаем хранилище Redux
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

function UserComponent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const userStatus = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  // Обновляем данные пользователя при монтировании компонента
  useEffect(() => {
    if (user) {
      dispatch(updateUser(user));
    }
  }, [dispatch, user]);

  if (userStatus === 'loading') {
    return <div>Updating user...</div>;
  }

  if (userStatus === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User Information</h1>
      {user ? (
        <div>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <UserComponent />
    </Provider>
  );
}

export default App;

// Итог:
// В этом примере мы создали простое приложение для управления данными пользователя с использованием Redux и @reduxjs/toolkit.
// Мы рассмотрели, как выполнять PUT-запросы с помощью createAsyncThunk и использовать хук useEffect для вызова этих запросов
// при изменении состояния компонента. Это позволяет нам эффективно управлять состоянием асинхронных операций и обрабатывать
// различные состояния (загрузка, успешное выполнение, ошибка) в нашем компоненте.
