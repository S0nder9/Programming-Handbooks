// Глава 17: React Router (Многостраничные SPA)

// React Router - это библиотека для управления навигацией и маршрутами в React-приложениях.
// Она позволяет создавать многостраничные SPA (Single Page Applications) с навигацией между разными экранами.

// Хук useLocation из React Router используется для получения информации о текущем местоположении (URL) внутри компонента.
// Он возвращает объект location, который содержит информацию о текущем маршруте.

// Методы и свойства объекта location:
// - pathname: строка, представляющая путь URL, например, "/about"
// - search: строка, представляющая параметры запроса, например, "?name=John"
// - hash: строка, представляющая фрагмент URL, например, "#section1"
// - state: состояние, переданное в этот маршрут (если применимо)

// Пример использования useLocation для получения текущего пути и отображения различных компонентов в зависимости от URL:

import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';

// Компонент для отображения информации о текущем местоположении
const LocationDisplay = () => {
  const location = useLocation();
  
  return (
    <div>
      <h2>Current Location</h2>
      <p>Pathname: {location.pathname}</p>
      <p>Search: {location.search}</p>
      <p>Hash: {location.hash}</p>
      <p>State: {JSON.stringify(location.state)}</p>
    </div>
  );
};

// Пример страниц
const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Page</h1>;
const Users = () => <h1>Users Page</h1>;

// Основной компонент приложения с маршрутизацией
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/users">Users</a></li>
          </ul>
        </nav>
        
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
        
        {/* Компонент для отображения текущего местоположения */}
        <LocationDisplay />
      </div>
    </Router>
  );
}

export default App;

// Итог:
// Хук useLocation из React Router позволяет получить текущую информацию о местоположении URL.
// Это полезно для отображения информации о текущем маршруте или для выполнения действий на основе изменения URL.
