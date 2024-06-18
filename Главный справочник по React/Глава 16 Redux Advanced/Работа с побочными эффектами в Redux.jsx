// Глава 16: Redux Advanced

// Работа с побочными эффектами в Redux и хранилище является важной частью разработки сложных приложений.
// В Redux состояние приложения управляется централизованно, но побочные эффекты, такие как асинхронные запросы, 
// должны быть обработаны специальными инструментами, такими как redux-thunk или redux-saga.

// В этом примере мы будем использовать redux-thunk для обработки асинхронных запросов.

// Установка необходимых пакетов:
// npm install redux react-redux redux-thunk

import React, { useEffect } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';

// Actions
const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
const fetchDataSuccess = data => ({ type: FETCH_DATA_SUCCESS, payload: data });
const fetchDataFailure = error => ({ type: FETCH_DATA_FAILURE, payload: error });

const fetchData = () => {
  return async dispatch => {
    dispatch(fetchDataRequest());
    try {
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error.toString()));
    }
  };
};

// Reducer
const initialState = {
  loading: false,
  data: [],
  error: ''
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, loading: true };
    case FETCH_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: '' };
    case FETCH_DATA_FAILURE:
      return { ...state, loading: false, data: [], error: action.payload };
    default:
      return state;
  }
};

// Store
const store = createStore(dataReducer, applyMiddleware(thunk));

// DataFetchingComponent
const DataFetchingComponent = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

// App
const App = () => (
  <Provider store={store}>
    <div>
      <h1>Пример работы с побочными эффектами в Redux</h1>
      <DataFetchingComponent />
    </div>
  </Provider>
);

export default App;

// Итог:
// Использование redux-thunk позволяет легко управлять побочными эффектами в Redux, такими как асинхронные запросы. 
// Это упрощает обработку данных и управление состоянием приложения, делая его более предсказуемым и управляемым.
