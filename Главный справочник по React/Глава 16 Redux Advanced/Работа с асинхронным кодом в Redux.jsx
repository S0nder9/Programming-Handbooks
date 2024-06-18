// Глава 16: Redux Advanced

// Работа с асинхронным кодом в Redux

// Введение:
// В Redux обычно используется синхронный код для изменения состояния.
// Однако в реальных приложениях часто необходимо работать с асинхронным кодом, например, для выполнения HTTP запросов.
// Для работы с асинхронными действиями в Redux можно использовать middleware, например, redux-thunk или redux-saga.

// Пример использования redux-thunk для работы с асинхронным кодом

// Установка redux и redux-thunk:
// npm install redux react-redux redux-thunk

import React, { useEffect } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';

// Изначальное состояние
const initialState = {
  loading: false,
  data: [],
  error: null,
};

// Action Types
const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Action Creators
const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

// Async Action Creator (Thunk)
const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

// Создание хранилища с middleware thunk
const store = createStore(reducer, applyMiddleware(thunk));

// Компонент для отображения данных
const DataComponent = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <h1>Данные:</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

// Основной компонент приложения
const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Пример асинхронного кода в Redux с использованием Thunk</h1>
        <DataComponent />
      </div>
    </Provider>
  );
};

export default App;

// Итог:
// В этом примере мы использовали redux-thunk для обработки асинхронных действий в Redux.
// Thunk позволяет создавать функции-действия, которые могут выполнять асинхронные операции, 
// такие как HTTP запросы, и диспатчить другие действия в зависимости от результата этих операций.
// Это помогает поддерживать чистоту и простоту редюсеров, сохраняя основную логику приложения управляемой.
