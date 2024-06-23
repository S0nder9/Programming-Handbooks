// Глава 17: React Router (Многостраничные SPA)

// React Router - это библиотека для маршрутизации в React-приложениях, позволяющая создавать многостраничные SPA (Single Page Applications).
// Он предоставляет компоненты и хуки для определения маршрутов, перехода между страницами и управления состоянием маршрутов.

// Основные компоненты и хуки React Router:
// 1. BrowserRouter - компонент, который оборачивает всё приложение и предоставляет функциональность маршрутизации.
// 2. Routes и Route - компоненты для определения маршрутов.
// 3. Link и NavLink - компоненты для создания ссылок и навигации.
// 4. useNavigate - хук для программного перехода между страницами.
// 5. useParams - хук для получения параметров маршрута.

// Пример гибкой маршрутизации с использованием React Router:

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams
} from 'react-router-dom';

// Компонент Home
function Home() {
  return <h2>Домашняя страница</h2>;
}

// Компонент About
function About() {
  return <h2>О нас</h2>;
}

// Компонент Users
function Users() {
  return (
    <div>
      <h2>Пользователи</h2>
      <ul>
        {/* Гибкое создание ссылок для пользователей */}
        {['user1', 'user2', 'user3'].map((user) => (
          <li key={user}>
            <Link to={`/users/${user}`}>{user}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Компонент UserDetails
function UserDetails() {
  let { userId } = useParams(); // Получаем параметр userId из маршрута
  return <h3>Детали пользователя: {userId}</h3>;
}

// Компонент Navigation для создания меню навигации
function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Домой</Link>
        </li>
        <li>
          <Link to="/about">О нас</Link>
        </li>
        <li>
          <Link to="/users">Пользователи</Link>
        </li>
      </ul>
    </nav>
  );
}

// Основной компонент App
function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// Итог:
// React Router позволяет создавать гибкую и мощную маршрутизацию в React-приложениях, избегая жестко закодированных значений.
// В примере показано, как использовать основные компоненты и хуки для определения маршрутов, создания динамических ссылок и получения параметров маршрута.
// Используя эти компоненты и хуки, можно легко управлять навигацией и состоянием маршрутов в многостраничных SPA.
