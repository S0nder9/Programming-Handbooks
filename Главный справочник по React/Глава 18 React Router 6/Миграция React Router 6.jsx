// Глава 18: React Router 6

// Миграция на React Router 6
// React Router 6 представляет собой значительное обновление, которое включает в себя множество улучшений и изменений по сравнению с предыдущими версиями.
// В этой главе мы рассмотрим основные изменения и покажем, как мигрировать приложение с React Router 5 на React Router 6.

// Основные изменения в React Router 6:
// 1. Новый синтаксис маршрутов: Маршруты теперь определяются с помощью нового компонента <Routes> вместо <Switch>.
// 2. Route rendering: Использование элементов вместо компонентов и рендер-пропсов.
// 3. Nested Routes: Упрощенная работа с вложенными маршрутами.
// 4. Use of useNavigate hook: Новый хук для навигации по маршрутам.
// 5. Automatic route ranking: Автоматическая система ранжирования маршрутов для определения наилучшего совпадения.

// Пример миграции с React Router 5 на React Router 6:

// Приложение на React Router 5
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
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
      </div>
    </Router>
  );
}

export default App;

// Приложение на React Router 6
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// Ключевые изменения в примере:
// 1. <Switch> был заменен на <Routes>.
// 2. <Route> теперь использует атрибут element для указания компонента, который должен быть рендерен. Вместо использования рендер-пропсов или children.

// Дополнительные изменения в React Router 6:
// 1. Обновленные хуки useParams, useLocation, useNavigate и useMatch.
// 2. Обновленный метод <Navigate> для программной навигации.
// 3. Поддержка абсолютных и относительных путей при определении маршрутов.

// Пример использования новых хуков и <Navigate>:

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate('/about');
  };

  return (
    <div>
      <h2>Home</h2>
      <button onClick={goToAbout}>Go to About</button>
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// Итог:
// Миграция на React Router 6 может потребовать значительных изменений в коде, особенно если приложение использует сложную маршрутизацию.
// Однако, React Router 6 предлагает множество улучшений и новых возможностей, которые делают маршрутизацию более мощной и удобной.
