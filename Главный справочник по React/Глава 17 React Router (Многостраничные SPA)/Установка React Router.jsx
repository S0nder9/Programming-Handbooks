// Глава 17: React Router (Многостраничные SPA)

// React Router - это библиотека для создания маршрутизации в React приложениях. Она позволяет создавать многостраничные SPA (Single Page Application), 
// что делает возможным навигацию между различными компонентами и страницами без перезагрузки страницы.

// Установка React Router:
// Чтобы установить React Router, используйте npm или yarn:

// npm install react-router-dom
// или
// yarn add react-router-dom

// Пример использования React Router в приложении:

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Компоненты для различных страниц
function Home() {
  return <h2>Главная страница</h2>;
}

function About() {
  return <h2>О нас</h2>;
}

function Users() {
  return <h2>Пользователи</h2>;
}

// Главный компонент приложения с маршрутизацией
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/about">О нас</Link>
            </li>
            <li>
              <Link to="/users">Пользователи</Link>
            </li>
          </ul>
        </nav>

        {/* Определение маршрутов для различных компонентов */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// Итог:
// В этом примере мы используем BrowserRouter, чтобы обернуть наше приложение и предоставить контекст маршрутизации. 
// Link компоненты используются для создания ссылок, которые позволяют пользователям навигировать между различными страницами 
// без перезагрузки страницы. Switch и Route компоненты используются для определения различных маршрутов и отображения 
// соответствующих компонентов в зависимости от текущего URL.
