// Глава 17: React Router (Многостраничные SPA)

// Хук useRouteMatch из библиотеки react-router-dom используется для работы с маршрутизацией в React-приложениях.
// Он позволяет получить информацию о текущем маршруте и сопоставить его с определенным шаблоном пути.

// Основные методы и свойства useRouteMatch:
// - path: строка, содержащая путь шаблона, с которым было выполнено сопоставление.
// - url: строка, содержащая URL, соответствующий шаблону пути.
// - isExact: булево значение, указывающее, является ли URL точным совпадением с шаблоном пути.
// - params: объект, содержащий параметры URL.

// Пример использования useRouteMatch:

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';

// Компонент для отображения информации о пользователе
function User() {
  // Получаем информацию о текущем маршруте
  let match = useRouteMatch();
  // Получаем параметры из URL
  let { userId } = useParams();

  return (
    <div>
      <h2>Пользователь ID: {userId}</h2>
      <p>Маршрут: {match.path}</p>
      <p>Точный маршрут: {match.isExact ? 'Да' : 'Нет'}</p>
    </div>
  );
}

// Компонент App с настройкой маршрутизации
function App() {
  return (
    <Router>
      <div>
        <h1>Пример использования useRouteMatch</h1>
        <ul>
          <li>
            <Link to="/user/1">Пользователь 1</Link>
          </li>
          <li>
            <Link to="/user/2">Пользователь 2</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/user/:userId">
            <User />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// Итог:
// Хук useRouteMatch позволяет легко получать информацию о текущем маршруте и сопоставлять его с шаблоном пути.
// Это полезно для создания динамических маршрутов и отображения соответствующих данных на основе параметров URL.
