// Глава 17: React Router (Многостраничные SPA)

// React Router является популярной библиотекой для навигации и управления маршрутами в одностраничных приложениях (SPA) на React.
// Она позволяет создавать многостраничные приложения, где каждая страница представляет собой компонент React, связанный с определенным маршрутом URL.

// Работа с параметрами запроса в React Router:
// Параметры запроса (query parameters) добавляются к URL после символа вопроса (?) и используются для передачи дополнительных данных.
// Например, в URL /jokes?sort=desc параметр sort имеет значение desc.
// React Router позволяет извлекать и использовать эти параметры в компонентах для динамического отображения данных.

// Пример работы с параметрами запроса в React Router:
import React from 'react';
import { BrowserRouter as Router, Route, Link, useLocation } from 'react-router-dom';

// Компонент для отображения данных в зависимости от параметров запроса
function JokesList() {
  // Используем хук useLocation для получения текущего URL и параметров запроса
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // Извлекаем параметр sort из URL
  const sortParam = params.get('sort') || 'asc'; // значение параметра sort или значение по умолчанию 'asc'

  // Пример данных (массив шуток)
  const jokes = [
    { id: 1, text: 'Шутка 1' },
    { id: 2, text: 'Шутка 2' },
    { id: 3, text: 'Шутка 3' },
  ];

  // Сортируем шутки в зависимости от значения параметра sort
  const sortedJokes = sortParam === 'desc' ? jokes.reverse() : jokes;

  return (
    <div>
      <h2>Список шуток</h2>
      <p>Сортировка: {sortParam}</p>
      <ul>
        {sortedJokes.map((joke) => (
          <li key={joke.id}>{joke.text}</li>
        ))}
      </ul>
    </div>
  );
}

// Пример использования React Router для маршрутизации
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/jokes">Список шуток</Link>
            </li>
            <li>
              <Link to="/jokes?sort=desc">Список шуток (сортировка по убыванию)</Link>
            </li>
          </ul>
        </nav>

        <Route path="/jokes">
          <JokesList />
        </Route>
      </div>
    </Router>
  );
}

export default App;

// Итог:
// React Router позволяет легко работать с маршрутами и параметрами запроса, что делает навигацию в многостраничных SPA гибкой и удобной.
// Путем извлечения параметров запроса из URL и использования их в компонентах React, приложения могут динамически реагировать на пользовательский ввод и контекст.
