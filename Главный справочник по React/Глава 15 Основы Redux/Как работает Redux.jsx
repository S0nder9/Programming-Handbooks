// Глава 15: Основы Redux

// Redux — это библиотека для управления состоянием в JavaScript приложениях. 
// Она часто используется с React, но может быть использована с любой другой библиотекой или фреймворком.

// Основные концепции Redux:
// 1. Store — централизованное место, где хранится все состояние приложения.
// 2. Actions — объекты, описывающие изменения в состоянии.
// 3. Reducers — функции, которые принимают текущее состояние и действие, а затем возвращают новое состояние.

// Пример: управление состоянием списка задач с использованием Redux.

// Установка необходимых библиотек:
// npm install redux react-redux

// actions.js
// Определяем типы действий и функции создания действий
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: text,
});

export const removeTodo = (index) => ({
  type: REMOVE_TODO,
  payload: index,
});

// reducers.js
// Определяем начальное состояние и редьюсер
const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((_, idx) => idx !== action.payload),
      };
    default:
      return state;
  }
};

// export default todoReducer;

// store.js
// Создаем и настраиваем хранилище Redux
import { createStore } from 'redux';
import todoReducer from './reducers';

const store = createStore(todoReducer);

// export default store;

// TodoApp.jsx
// Основной компонент приложения, использующий Redux для управления состоянием
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo } from './actions';

const TodoApp = () => {
  const [input, setInput] = useState('');
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput('');
    }
  };

  const handleRemoveTodo = (index) => {
    dispatch(removeTodo(index));
  };

  return (
    <div>
      <h1>Список задач</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAddTodo}>Добавить</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleRemoveTodo(index)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// export default TodoApp;

// index.js
// Подключаем Redux к приложению React
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import TodoApp from './TodoApp';

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);

// Итог:
// Redux предоставляет предсказуемый контейнер состояния для приложений JavaScript. 
// Он помогает централизованно управлять состоянием и логику приложения, 
// делая их более предсказуемыми и проще для тестирования.
