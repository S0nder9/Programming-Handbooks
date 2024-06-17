// Глава 15: Основы Redux

// Redux - это предсказуемый контейнер состояния для JavaScript приложений. Он помогает управлять состоянием приложения в предсказуемой и масштабируемой манере.

// В Redux, состояние разделено на "слайсы" (slices), каждый из которых отвечает за управление определенной частью состояния. 
// Использование нескольких слайсов позволяет лучше организовать код и сделать его более поддерживаемым.

// Пример: Использование нескольких слайсов в Redux

// 1. Установка необходимых пакетов:
// npm install @reduxjs/toolkit react-redux

// 2. Создание слайсов состояния
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Слайс для управления состоянием пользователя
const userSlice = createSlice({
  name: 'user',
  initialState: { name: '', age: 0 },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAge: (state, action) => {
      state.age = action.payload;
    }
  }
});

// Слайс для управления состоянием продуктов
const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    removeProduct: (state, action) => {
      return state.filter(product => product.id !== action.payload);
    }
  }
});

// Создание Redux store и объединение редюсеров
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    products: productsSlice.reducer
  }
});

// Пример компонента, использующего состояние пользователя
function UserComponent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const updateName = () => {
    dispatch(userSlice.actions.setName('John Doe'));
  };

  const updateAge = () => {
    dispatch(userSlice.actions.setAge(30));
  };

  return (
    <div>
      <h2>User Information</h2>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <button onClick={updateName}>Set Name</button>
      <button onClick={updateAge}>Set Age</button>
    </div>
  );
}

// Пример компонента, использующего состояние продуктов
function ProductsComponent() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const addProduct = () => {
    dispatch(productsSlice.actions.addProduct({ id: 1, name: 'Product 1' }));
  };

  const removeProduct = () => {
    dispatch(productsSlice.actions.removeProduct(1));
  };

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
      <button onClick={removeProduct}>Remove Product</button>
    </div>
  );
}

// Основной компонент приложения
function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Redux Multiple Slices Example</h1>
        <UserComponent />
        <ProductsComponent />
      </div>
    </Provider>
  );
}

export default App;

// Итог:
// Использование нескольких слайсов в Redux помогает организовать состояние приложения более логичным образом.
// Это делает код более структурированным и удобным для сопровождения, особенно в крупных приложениях.
