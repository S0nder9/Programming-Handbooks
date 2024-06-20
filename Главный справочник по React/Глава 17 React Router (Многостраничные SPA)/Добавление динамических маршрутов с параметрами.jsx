// Глава 17: React Router (Многостраничные SPA)

// React Router - это библиотека для управления маршрутизацией в React-приложениях.
// Она позволяет создавать многостраничные приложения с плавной навигацией, без перезагрузки страницы.

// Добавление динамических маршрутов с параметрами:
// React Router позволяет создавать маршруты с параметрами, которые можно использовать для отображения динамического контента.
// Параметры маршрута определяются с помощью двоеточия (:).

// Установка React Router:
// npm install react-router-dom

// Пример добавления динамических маршрутов с параметрами:

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';

// Компонент для отображения списка пользователей
const UsersList = () => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];

  return (
    <div>
      <h1>Список пользователей</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Компонент для отображения информации о пользователе
const UserDetail = () => {
  const { id } = useParams();
  const user = { id, name: 'User ' + id };

  return (
    <div>
      <h1>Информация о пользователе</h1>
      <p>ID: {user.id}</p>
      <p>Имя: {user.name}</p>
    </div>
  );
};

// Главный компонент приложения
const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/users">Пользователи</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <h1>Добро пожаловать на главную страницу</h1>
          </Route>
          <Route exact path="/users" component={UsersList} />
          <Route path="/users/:id" component={UserDetail} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

// Итог:
// React Router позволяет легко создавать многостраничные SPA с динамическими маршрутами.
// В этом примере мы создали маршруты для отображения списка пользователей и информации о конкретном пользователе, используя параметры маршрутов.
