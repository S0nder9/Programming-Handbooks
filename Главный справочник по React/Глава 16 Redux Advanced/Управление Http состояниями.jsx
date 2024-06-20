// Глава 16: Redux Advanced

// Управление HTTP состояниями, используя @reduxjs/toolkit

// Redux Toolkit (@reduxjs/toolkit) упрощает работу с Redux, предоставляя удобные утилиты для создания хранилища, редьюсеров и действий.
// Управление состояниями HTTP запросов с использованием Redux Toolkit позволяет централизованно управлять данными и их состояниями (loading, success, error).

// Установка Redux Toolkit:
// npm install @reduxjs/toolkit react-redux

// Шаг 1: Создание среза (slice) с состояниями загрузки
import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Создание асинхронного действия для загрузки данных
export const fetchData = createAsyncThunk(
  'data/fetchData',
  async () => {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
);

// Создание среза с состояниями загрузки
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Экспортируем редьюсер для добавления в хранилище
export const dataReducer = dataSlice.reducer;

// Шаг 2: Создание хранилища Redux
const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

// Шаг 3: Создание компонента для отображения данных
function DataFetchingComponent() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка...</div>; // отображаем индикатор загрузки
  }

  if (error) {
    return <div>Ошибка: {error}</div>; // отображаем сообщение об ошибке
  }

  return (
    <div>
      {/* Отображаем данные */}
      <h1>Данные:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

// Шаг 4: Использование компонента DataFetchingComponent в приложении
function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Пример управления HTTP состояниями с Redux Toolkit</h1>
        <DataFetchingComponent />
      </div>
    </Provider>
  );
}

export default App;

// Итог:
// Управление состояниями HTTP запросов с использованием Redux Toolkit позволяет легко и централизованно управлять процессом загрузки данных.
// Это делает код более чистым и поддерживаемым, а также улучшает пользователемский опыт за счет правильного отображения состояний загрузки и ошибок.
