// Глава 17: React Router (Многостраничные SPA)

// Маршрутизация (Routing) — это процесс определения пути, по которому приложение должно перейти в зависимости от URL.
// В многостраничных SPA (Single Page Applications) маршрутизация позволяет обновлять URL и отображать различные компоненты без перезагрузки страницы.

// React Router — это популярная библиотека для управления маршрутизацией в React-приложениях.

// Основные компоненты React Router:
// 1. BrowserRouter — оборачивает все приложение и используется для создания маршрутов.
// 2. Route — определяет маршрут и компонент, который должен быть отображен.
// 3. Switch — рендерит первый совпадающий маршрут.
// 4. Link — используется для создания ссылок, которые меняют URL без перезагрузки страницы.

// Пример использования React Router:
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Главная страница
const Home = () => (
  <div>
    <h2>Главная страница</h2>
    <p>Добро пожаловать на главную страницу!</p>
  </div>
);

// Страница "О нас"
const About = () => (
  <div>
    <h2>О нас</h2>
    <p>Это страница о нас.</p>
  </div>
);

// Страница "Контакты"
const Contact = () => (
  <div>
    <h2>Контакты</h2>
    <p>Это страница контактов.</p>
  </div>
);

// Компонент для навигации
const Navigation = () => (
  <nav>
    <ul>
      <li><Link to="/">Главная</Link></li>
      <li><Link to="/about">О нас</Link></li>
      <li><Link to="/contact">Контакты</Link></li>
    </ul>
  </nav>
);

// Основной компонент приложения
const App = () => (
  <Router>
    <div>
      <h1>Пример React Router</h1>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));

// Итог:
// Маршрутизация с помощью React Router позволяет создавать многостраничные SPA, 
// где разные компоненты отображаются в зависимости от текущего URL, без необходимости перезагрузки страницы.
// Это обеспечивает лучшую производительность и улучшает пользовательский опыт.
