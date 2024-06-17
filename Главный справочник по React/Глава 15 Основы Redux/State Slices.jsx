// Глава 15: Основы Redux

// Redux — это библиотека для управления состоянием приложения, которая часто используется с React.
// Основная идея Redux заключается в том, что состояние всего приложения хранится в одном объекте (store).
// Этот объект называется store, и он является единственным источником правды для состояния вашего приложения.

// State Slices:
// В больших приложениях состояние может быть разделено на логически изолированные части, называемые срезами состояния (state slices).
// Каждый slice отвечает за определенную часть состояния и управляется своим редьюсером (reducer).

// Пример использования Redux с state slices:

// Шаг 1: Установите необходимые пакеты
// npm install @reduxjs/toolkit react-redux

// Шаг 2: Создайте slice для управления состоянием пользователя

import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

// Создание slice для пользователя
const userSlice = createSlice({
  name: 'user',
  initialState: { name: '', age: 0 },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAge: (state, action) => {
      state.age = action.payload;
    },
  },
});

// Экспортируем actions и reducer из userSlice
const { setName, setAge } = userSlice.actions;
const userReducer = userSlice.reducer;

// Создание другого slice для управления списком задач
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    removeTask: (state, action) => {
      return state.filter(task => task.id !== action.payload);
    },
  },
});

// Экспортируем actions и reducer из tasksSlice
const { addTask, removeTask } = tasksSlice.actions;
const tasksReducer = tasksSlice.reducer;

// Шаг 3: Настройте store с использованием configureStore и добавьте созданные reducers
const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
  },
});

// Шаг 4: Создайте компонент, который использует Redux

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const handleNameChange = (e) => {
    dispatch(setName(e.target.value));
  };

  const handleAgeChange = (e) => {
    dispatch(setAge(Number(e.target.value)));
  };

  return (
    <div>
      <h2>User Profile</h2>
      <label>
        Name:
        <input type="text" value={user.name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Age:
        <input type="number" value={user.age} onChange={handleAgeChange} />
      </label>
      <p>
        Name: {user.name}, Age: {user.age}
      </p>
    </div>
  );
};

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);
  const [taskText, setTaskText] = React.useState('');

  const handleAddTask = () => {
    const newTask = { id: Date.now(), text: taskText };
    dispatch(addTask(newTask));
    setTaskText('');
  };

  const handleRemoveTask = (id) => {
    dispatch(removeTask(id));
  };

  return (
    <div>
      <h2>Tasks</h2>
      <input 
        type="text" 
        value={taskText} 
        onChange={(e) => setTaskText(e.target.value)} 
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text} <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Шаг 5: Оберните приложение в Provider и передайте store
const App = () => (
  <Provider store={store}>
    <div>
      <h1>Redux State Slices Example</h1>
      <UserProfile />
      <Tasks />
    </div>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// Итог:
// Redux позволяет управлять состоянием приложения централизованно, разделяя его на отдельные части (slices) для лучшей организации кода.
// В этом примере мы создали два slices: один для управления состоянием пользователя, другой для управления списком задач.
// Каждый slice управляется своим reducer и actions, а state хранится в одном общем store.
