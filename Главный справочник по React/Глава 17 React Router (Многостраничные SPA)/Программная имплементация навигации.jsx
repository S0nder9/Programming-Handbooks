// Глава 17: React Router (Многостраничные SPA)

// React Router — это библиотека для создания многостраничных SPA (Single Page Application) приложений в React.
// Она позволяет организовать маршрутизацию в приложении, управляя переходами между различными страницами или компонентами.

// Программная имплементация навигации осуществляется с помощью хука useHistory из библиотеки React Router.
// Этот хук предоставляет доступ к объекту истории, который можно использовать для программного изменения маршрутов.

// Методы useHistory:
// 1. history.push(path, [state]) — добавляет новый маршрут в стек истории.
// 2. history.replace(path, [state]) — заменяет текущий маршрут в стеке истории.
// 3. history.go(n) — перемещает пользователя на n записей в истории.
// 4. history.goBack() — перемещает пользователя на одну запись назад в истории.
// 5. history.goForward() — перемещает пользователя на одну запись вперед в истории.

// Пример использования useHistory для программной навигации:
import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();

  const navigateToAbout = () => {
    // Переход на страницу "About" с использованием метода push
    history.push('/about');
  };

  return (
    <div>
      <h1>Главная страница</h1>
      <button onClick={navigateToAbout}>Перейти на страницу "О нас"</button>
    </div>
  );
}

function About() {
  const history = useHistory();

  const goBack = () => {
    // Возвращаемся на предыдущую страницу
    history.goBack();
  };

  return (
    <div>
      <h1>Страница "О нас"</h1>
      <button onClick={goBack}>Назад</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/about">
            <About />
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
// React Router предоставляет мощные инструменты для организации маршрутизации в многостраничных SPA-приложениях.
// С помощью хука useHistory можно программно изменять маршруты, добавлять новые маршруты в стек истории,
// заменять текущий маршрут, перемещаться по истории и возвращаться на предыдущие страницы.
// Это делает навигацию в приложении гибкой и удобной для пользователя.
