// Глава 17: React Router (Многостраничные SPA)

// React Router — это библиотека для управления маршрутизацией в React-приложениях.
// Она позволяет создавать многостраничные SPA (Single Page Application), предоставляя функционал для обработки маршрутов и навигации между ними.

// Основные компоненты React Router:
// 1. BrowserRouter — контейнер для маршрутов.
// 2. Route — компонент, который сопоставляет путь URL с соответствующим компонентом.
// 3. Switch — компонент, который рендерит первый соответствующий маршрут.
// 4. Link — компонент для создания ссылок на маршруты.

// Пример простого маршрутизации с обработкой невалидных маршрутов:

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Определение компонентов для маршрутов
const Home = () => <h2>Домашняя страница</h2>;
const About = () => <h2>О нас</h2>;
const Contact = () => <h2>Контакты</h2>;

// Компонент для обработки невалидных маршрутов
const NotFound = () => <h2>Страница не найдена</h2>;

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Домашняя</Link>
            </li>
            <li>
              <Link to="/about">О нас</Link>
            </li>
            <li>
              <Link to="/contact">Контакты</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          {/* Определение маршрутов */}
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          {/* Обработка невалидных маршрутов */}
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// Объяснение:
// 1. BrowserRouter используется как контейнер для маршрутов. Он должен оборачивать все приложение или его часть, где требуется маршрутизация.
// 2. Route компоненты определяют пути и соответствующие им компоненты. Маршрут с exact path="/" используется для точного соответствия домашней страницы.
// 3. Switch используется для рендеринга первого маршрута, который совпадает с текущим URL. Это предотвращает рендеринг нескольких маршрутов одновременно.
// 4. Route path="*" используется для обработки всех невалидных маршрутов. Он рендерит компонент NotFound, если ни один из предыдущих маршрутов не совпадает с текущим URL.
// 5. Link компоненты создают ссылки для навигации между различными маршрутами, заменяя стандартные HTML ссылки.

// Итог:
// React Router позволяет легко управлять маршрутизацией в многостраничных SPA-приложениях. Он предоставляет мощные возможности для определения маршрутов, обработки невалидных путей и создания навигации.
