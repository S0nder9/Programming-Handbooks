// Глава 17: React Router (Многостраничные SPA)

// Компонент Prompt
// Компонент Prompt используется в React Router для отображения диалогового окна подтверждения,
// когда пользователь пытается перейти с текущей страницы, на которой есть несохраненные изменения.

// Пропсы Prompt:
// 1. when: boolean - Указывает, следует ли показывать диалоговое окно подтверждения.
// 2. message: string | function - Сообщение, которое будет отображено в диалоговом окне. 
//    Если это функция, она должна возвращать строку, которая будет использоваться в качестве сообщения.

// Пример использования компонента Prompt:
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Prompt } from 'react-router-dom';

function FormComponent() {
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
    setIsFormDirty(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Форма отправлена!');
    setIsFormDirty(false);
    setInputValue('');
  };

  return (
    <div>
      <h1>Форма с защитой от выхода</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Введите текст:
          <input type="text" value={inputValue} onChange={handleChange} />
        </label>
        <button type="submit">Отправить</button>
      </form>
      <Prompt
        when={isFormDirty}
        message="У вас есть несохраненные изменения. Вы действительно хотите покинуть страницу?"
      />
    </div>
  );
}

function Home() {
  return <h1>Главная страница</h1>;
}

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/form">Форма</Link>
          </li>
        </ul>
      </nav>
      <Route path="/" exact component={Home} />
      <Route path="/form" component={FormComponent} />
    </Router>
  );
}

export default App;

// Итог:
// Компонент Prompt позволяет предотвратить случайный выход пользователя с текущей страницы,
// если на ней имеются несохраненные изменения. Это особенно полезно в формах и других компонентах,
// где пользователь может вносить данные, которые могут быть потеряны при навигации.
