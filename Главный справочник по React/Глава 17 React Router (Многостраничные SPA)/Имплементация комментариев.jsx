// Глава 17: React Router (Многостраничные SPA)

// React Router — это библиотека для управления маршрутизацией в React-приложениях.
// Она позволяет создавать многостраничные SPA (Single Page Application), где переходы между страницами происходят без перезагрузки страницы.

// Имплементация комментариев:
// Рассмотрим пример, где мы создаем SPA с двумя страницами: Главная и Комментарии.
// Мы будем использовать React Router для маршрутизации и демонстрации комментариев на отдельной странице.

// Установка React Router:
// npm install react-router-dom

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';

// Главная страница
function Home() {
  return (
    <div>
      <h1>Главная страница</h1>
      <Link to="/comments">Перейти к комментариям</Link>
    </div>
  );
}

// Компонент для отображения одного комментария
function Comment({ comment }) {
  return (
    <div>
      <h3>{comment.author}</h3>
      <p>{comment.text}</p>
    </div>
  );
}

// Страница с комментариями
function Comments() {
  const comments = [
    { id: 1, author: 'John Doe', text: 'Это первый комментарий.' },
    { id: 2, author: 'Jane Smith', text: 'Это второй комментарий.' },
    { id: 3, author: 'Alice Johnson', text: 'Это третий комментарий.' }
  ];

  return (
    <div>
      <h1>Комментарии</h1>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <Link to="/">Назад на главную</Link>
    </div>
  );
}

// Компонент для отображения деталей комментария
function CommentDetail() {
  const { id } = useParams();
  const comments = [
    { id: '1', author: 'John Doe', text: 'Это первый комментарий.' },
    { id: '2', author: 'Jane Smith', text: 'Это второй комментарий.' },
    { id: '3', author: 'Alice Johnson', text: 'Это третий комментарий.' }
  ];

  const comment = comments.find(comment => comment.id === id);

  if (!comment) {
    return <div>Комментарий не найден.</div>;
  }

  return (
    <div>
      <h2>{comment.author}</h2>
      <p>{comment.text}</p>
      <Link to="/comments">Назад к комментариям</Link>
    </div>
  );
}

// Главный компонент приложения с маршрутизацией
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
              <Link to="/comments">Комментарии</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/comments" exact component={Comments} />
          <Route path="/comments/:id" component={CommentDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// Итог:
// React Router позволяет легко создавать многостраничные SPA, управляя маршрутами внутри приложения.
// В данном примере мы создали приложение с двумя страницами и использовали маршрутизацию для перехода между Главной страницей и страницей Комментариев, включая детализацию отдельного комментария.
