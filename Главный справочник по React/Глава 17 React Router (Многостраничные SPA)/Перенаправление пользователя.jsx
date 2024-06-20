// Глава 17: React Router (Многостраничные SPA)

// React Router является библиотекой для управления маршрутизацией в React-приложениях, позволяя создавать многостраничные Single Page Applications (SPA).
// Он предоставляет компоненты для определения маршрутов и переходов между страницами без полной перезагрузки браузера.

// Пример использования React Router для маршрутизации:

import React from 'react';
import { BrowserRouter as Router, Route, Link, Navigate, Redirect } from 'react-router-dom';

// Пример компонентов страниц
const Home = () => <h1>Домашняя страница</h1>;
const About = () => <h1>О нас</h1>;
const Contact = () => <h1>Контакты</h1>;

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          {/* Навигационные ссылки */}
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/about">О нас</Link></li>
            <li><Link to="/contact">Контакты</Link></li>
          </ul>
        </nav>
        
        {/* Маршруты для компонентов */}
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />

        {/* Пример использования Navigate и Redirect */}
        <Route path="/help">
          {/* Перенаправление на другой маршрут */}
          <Navigate to="/about" />
        </Route>

        <Route path="/services">
          {/* Перенаправление на внешний URL */}
          <Navigate to="https://example.com" replace />
        </Route>

        <Route path="/login">
          {/* Условное перенаправление */}
          {isLoggedIn ? <Redirect to="/dashboard" /> : <LoginPage />}
        </Route>
      </div>
    </Router>
  );
};

export default App;

// Объяснение примера:
// В этом примере мы используем BrowserRouter для определения маршрутов нашего приложения.
// Компоненты Route определяют, какой компонент отображать на каждом маршруте.
// Компоненты Link используются для создания навигационных ссылок между страницами.
// Navigate используется для программного перенаправления пользователя на другой маршрут или URL.
// Redirect позволяет перенаправлять пользователя на другой маршрут в зависимости от условий.

// Итог:
// React Router облегчает создание многостраничных SPA, предоставляя мощные инструменты для управления маршрутизацией и переходами между страницами.
// Он позволяет создавать более динамичные и пользовательски удобные интерфейсы в ваших React-приложениях.
