// Глава 15: Основы Redux

// Более сложные Actions
// В Redux actions представляют собой простые объекты, которые описывают тип действия и данные, необходимые для обновления состояния.
// Более сложные actions могут включать в себя асинхронные операции, такие как API-запросы, и обработку множества различных состояний (загрузка, успех, ошибка).

// Для работы с асинхронными actions обычно используют middleware, такое как redux-thunk или redux-saga.
// В данном примере мы будем использовать redux-thunk для обработки асинхронных actions.

// Установка redux-thunk:
// npm install redux redux-thunk

// Пример асинхронного action для загрузки данных с API с использованием redux-thunk:

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';

// Action Types
const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

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

// Async Action Creator
const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

// Initial State
const initialState = {
  loading: false,
  data: null,
  error: null,
};

// Reducer
const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
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

// Store
const store = createStore(dataReducer, applyMiddleware(thunk));

// Component
const DataFetchingComponent = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state);

  React.useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

// App Component
const App = () => (
  <Provider store={store}>
    <div>
      <h1>Redux Thunk Example</h1>
      <DataFetchingComponent />
    </div>
  </Provider>
);

export default App;

// Итог:
// Использование redux-thunk для создания асинхронных actions позволяет эффективно управлять состояниями загрузки данных, 
// успешного получения данных и ошибок в вашем приложении. Это улучшает взаимодействие с пользователем и делает приложение более устойчивым.
