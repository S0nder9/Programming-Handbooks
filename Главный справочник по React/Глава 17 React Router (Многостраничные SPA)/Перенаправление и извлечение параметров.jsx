// Глава 17: React Router (Многостраничные SPA)

// React Router — это библиотека для управления маршрутизацией в React-приложениях.
// Она позволяет создавать многостраничные SPA (Single Page Application) с использованием клиентской маршрутизации.

// Перенаправление и извлечение параметров являются ключевыми аспектами работы с React Router.

// Для начала установим React Router:
// npm install react-router-dom

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useParams, useHistory } from 'react-router-dom';

// Компонент Home
function Home() {
  return (
    <div>
      <h1>Главная страница</h1>
      <Link to="/about">Перейти на страницу О нас</Link>
      <br />
      <Link to="/user/1">Перейти на страницу пользователя с ID 1</Link>
    </div>
  );
}

// Компонент About
function About() {
  const history = useHistory();

  const handleRedirect = () => {
    history.push('/user/2'); // Перенаправление на страницу пользователя с ID 2
  };

  return (
    <div>
      <h1>О нас</h1>
      <button onClick={handleRedirect}>Перейти на страницу пользователя с ID 2</button>
      <br />
      <Link to="/">Назад на главную</Link>
    </div>
  );
}

// Компонент User, который извлекает параметр ID из URL
function User() {
  const { id } = useParams();

  return (
    <div>
      <h1>Страница пользователя</h1>
      <p>Пользователь с ID: {id}</p>
      <Link to="/">Назад на главную</Link>
    </div>
  );
}

// Главный компонент App
function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Главная</Link> | <Link to="/about">О нас</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/user/:id" component={User} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// В этом примере:
// - Мы используем компонент Router из react-router-dom для управления маршрутизацией.
// - Компонент Switch используется для рендеринга первого совпадающего Route.
// - Компонент Route задает путь и компонент, который должен быть отрендерен при переходе по этому пути.
// - Компоненты Link используются для создания ссылок на различные маршруты.
// - Хук useParams используется для извлечения параметра ID из URL в компоненте User.
// - Хук useHistory используется для программного перенаправления на другой маршрут в компоненте About.

// Итог:
// React Router предоставляет мощные инструменты для создания многостраничных SPA, позволяя легко управлять маршрутами,
// извлекать параметры из URL и выполнять перенаправления.
