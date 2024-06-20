// Глава 17: React Router (Многостраничные SPA)

// React Router — это библиотека для маршрутизации в React-приложениях.
// Она позволяет создавать многостраничные SPA (Single Page Applications) с помощью маршрутов.

// Основные компоненты React Router:
// - BrowserRouter: оборачивает всё приложение и обеспечивает маршрутизацию.
// - Routes: используется для группировки Route компонентов.
// - Route: определяет маршрут, который отображает определенный компонент на основе URL.
// - Link: используется для навигации между маршрутами.

// Установка React Router:
// npm install react-router-dom

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Компоненты страниц
function Home() {
  return <h2>Главная страница</h2>;
}

function About() {
  return <h2>О нас</h2>;
}

function Contact() {
  return <h2>Контакты</h2>;
}

// Основной компонент приложения
function App() {
  return (
    <Router>
      <div>
        {/* Навигация */}
        <nav>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/about">О нас</Link>
            </li>
            <li>
              <Link to="/contact">Контакты</Link>
            </li>
          </ul>
        </nav>

        {/* Маршруты */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

// Рендеринг приложения
ReactDOM.render(<App />, document.getElementById('root'));

// Пример выше включает:
// 1. BrowserRouter, оборачивающий всё приложение для поддержки маршрутизации.
// 2. Routes для группировки всех маршрутов.
// 3. Route для определения пути и связанного с ним компонента.
// 4. Link для навигации между маршрутами.

// При посещении URL /, отображается компонент Home.
// При посещении URL /about, отображается компонент About.
// При посещении URL /contact, отображается компонент Contact.

// Итог:
// React Router упрощает создание многостраничных SPA, предоставляя простой и понятный способ определения и использования маршрутов.
