// Глава 17: React Router (Многостраничные SPA)

// Вложенные маршруты позволяют создавать многостраничные приложения, где одни маршруты вложены в другие. 
// Это полезно для создания сложных иерархий страниц, таких как админ-панели или страницы профилей пользователей.

// Для реализации вложенных маршрутов используется библиотека react-router-dom.

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch } from 'react-router-dom';

// Главная страница приложения
function Home() {
  return <h2>Главная страница</h2>;
}

// О нас страница
function About() {
  return <h2>О нас</h2>;
}

// Страница профиля пользователя
function Profile() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <h2>Профиль пользователя</h2>
      <ul>
        <li>
          <Link to={`${url}/details`}>Детали</Link>
        </li>
        <li>
          <Link to={`${url}/settings`}>Настройки</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Пожалуйста, выберите раздел профиля.</h3>
        </Route>
        <Route path={`${path}/details`}>
          <ProfileDetails />
        </Route>
        <Route path={`${path}/settings`}>
          <ProfileSettings />
        </Route>
      </Switch>
    </div>
  );
}

// Компонент для отображения деталей профиля
function ProfileDetails() {
  return <h3>Детали профиля</h3>;
}

// Компонент для отображения настроек профиля
function ProfileSettings() {
  return <h3>Настройки профиля</h3>;
}

// Основное приложение с роутингом
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
              <Link to="/profile">Профиль</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/profile">
            <Profile />
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
// Вложенные маршруты позволяют структурировать приложение на несколько уровней маршрутов, 
// обеспечивая удобную навигацию и организацию страниц. В примере выше показано, как создать вложенные маршруты для страницы профиля, 
// где можно переключаться между деталями проф
