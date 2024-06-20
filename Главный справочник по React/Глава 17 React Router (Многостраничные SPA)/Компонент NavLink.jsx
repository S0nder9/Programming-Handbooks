// Глава 17: React Router (Многостраничные SPA)

// React Router - это библиотека для создания многостраничных приложений на основе React. 
// Он позволяет навигацию между различными страницами и компонентами в вашем приложении, 
// не перезагружая страницу, что делает его идеальным для создания одностраничных приложений (SPA).

// Компонент NavLink:
// NavLink - это специальный компонент, предоставляемый React Router, который используется для создания ссылок, 
// которые могут применять стили или классы при совпадении текущего URL с маршрутом.

// Пример использования компонента NavLink:
import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

// Компоненты для различных страниц
const Home = () => (
  <div>
    <h2>Главная страница</h2>
    <p>Добро пожаловать на главную страницу!</p>
  </div>
);

const About = () => (
  <div>
    <h2>О нас</h2>
    <p>Информация о нашем сайте.</p>
  </div>
);

const Contact = () => (
  <div>
    <h2>Контакты</h2>
    <p>Свяжитесь с нами.</p>
  </div>
);

// Компонент навигации с использованием NavLink
const Navigation = () => (
  <nav>
    <ul>
      <li>
        <NavLink exact to="/" activeClassName="active">
          Главная
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" activeClassName="active">
          О нас
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" activeClassName="active">
          Контакты
        </NavLink>
      </li>
    </ul>
  </nav>
);

// Основной компонент приложения
function App() {
  return (
    <Router>
      <div>
        <h1>React Router Пример</h1>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// Описание примера:
// 1. Созданы три простых компонента: Home, About и Contact, которые представляют различные страницы.
// 2. Компонент Navigation содержит ссылки, использующие NavLink для навигации между страницами.
// 3. Компонент NavLink имеет свойство activeClassName, которое применяет класс "active" к ссылке, если текущий URL совпадает с путём ссылки.
// 4. Компонент App использует Router для обёртывания всего приложения и Switch для маршрутизации между разными компонентами на основе URL.

// Итог:
// NavLink в React Router является мощным инструментом для создания ссылок, которые могут динамически изменять свои стили в зависимости от текущего маршрута.
// Это позволяет легко создавать навигационные меню и поддерживать активные ссылки в одностраничных приложениях.
