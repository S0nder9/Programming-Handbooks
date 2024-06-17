// Глава 15: Основы Redux

// Redux — это предсказуемый контейнер состояния для JavaScript приложений. Он помогает управлять состоянием приложения и позволяет
// строить приложения, которые ведут себя последовательно, работают в разных окружениях (клиент, сервер и нативные), и просты для тестирования.

// Основные концепции Redux:
// 1. Store — единый источник состояния приложения.
// 2. Actions — объекты, которые описывают изменения состояния.
// 3. Reducers — функции, которые определяют, как состояние приложения изменяется в ответ на действия (actions).

// Работа с несколькими свойствами состояний:
// В Redux состояние всего приложения хранится в одном объекте. Чтобы управлять несколькими свойствами состояний,
// необходимо определить соответствующие редьюсеры и действия.

// Пример работы с несколькими свойствами состояний:
// В этом примере мы будем управлять состоянием пользователя и списка задач.

import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Actions
const SET_USER = 'SET_USER';
const ADD_TODO = 'ADD_TODO';

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

// Reducers
const userReducer = (state = null, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
};

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    default:
      return state;
  }
};

// Combine Reducers
const rootReducer = combineReducers({
  user: userReducer,
  todos: todosReducer,
});

// Create Store
const store = createStore(rootReducer);

// Components
const UserComponent = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSetUser = () => {
    dispatch(setUser({ name: 'John Doe', age: 30 }));
  };

  return (
    <div>
      <h2>User Information</h2>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
        </div>
      ) : (
        <p>No user information</p>
      )}
      <button onClick={handleSetUser}>Set User</button>
    </div>
  );
};

const TodosComponent = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    const todo = prompt('Enter a new todo:');
    dispatch(addTodo(todo));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Redux Example</h1>
        <UserComponent />
        <TodosComponent />
      </div>
    </Provider>
  );
};

export default App;

// Итог:
// Работа с несколькими свойствами состояний в Redux требует определения нескольких редьюсеров и действий,
// а также комбинирования редьюсеров с помощью combineReducers. Это позволяет управлять состоянием приложения 
// в одном центральном месте и делает код более организованным и легким для поддержки.
