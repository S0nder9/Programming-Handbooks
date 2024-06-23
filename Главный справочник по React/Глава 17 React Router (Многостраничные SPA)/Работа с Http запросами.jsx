// Глава 17: React Router (Многостраничные SPA)

// React Router используется для создания многостраничных приложений (SPA) в React. 
// Он позволяет навигацию между различными компонентами без перезагрузки страницы.

// В этой главе мы рассмотрим, как использовать React Router для работы с HTTP запросами 
// и управлением состоянием данных в многостраничных SPA.

// Установка React Router:
// npm install react-router-dom

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useParams,
  useHistory
} from 'react-router-dom';

// Компонент Home — главная страница
function Home() {
  return (
    <div>
      <h1>Главная страница</h1>
      <nav>
        <ul>
          <li><Link to="/users">Пользователи</Link></li>
        </ul>
      </nav>
    </div>
  );
}

// Компонент Users — страница со списком пользователей
function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

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
}

// Компонент UserDetail — страница с информацией о конкретном пользователе
function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  return (
    <div>
      <h1>Информация о пользователе</h1>
      <p><strong>Имя:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Телефон:</strong> {user.phone}</p>
      <button onClick={() => history.goBack()}>Назад</button>
    </div>
  );
}

// Основной компонент App — установка маршрутов
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={Users} />
        <Route path="/users/:id" component={UserDetail} />
      </Switch>
    </Router>
  );
}

export default App;

// Итог:
// React Router позволяет создавать многостраничные приложения, поддерживая навигацию между различными компонентами.
// В данном примере показано, как работать с HTTP запросами для загрузки данных и управления состояниями в многостраничных SPA.
// Мы создали три компонента: Home, Users и UserDetail, и настроили маршруты для навигации между ними.
