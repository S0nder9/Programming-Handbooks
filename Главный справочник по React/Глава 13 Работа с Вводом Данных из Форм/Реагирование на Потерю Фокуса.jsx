// Глава 13: Работа с Вводом Данных из Форм

// Реагирование на Потерю Фокуса
// В React, вы можете обрабатывать события потери фокуса на элементах формы, используя событие onBlur.
// Это может быть полезно для валидации данных или выполнения определенных действий, когда пользователь покидает поле ввода.

// Пример:
// Рассмотрим простой пример формы с полем ввода для имени пользователя. 
// Мы будем валидировать это поле при потере фокуса и отображать сообщение об ошибке, если поле пустое.

import React, { useState } from 'react';

function UsernameForm() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  // Функция для обработки изменения значения поля ввода
  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  // Функция для обработки события потери фокуса
  const handleBlur = () => {
    if (username.trim() === '') {
      setError('Имя пользователя не должно быть пустым');
    } else {
      setError('');
    }
  };

  // Функция для обработки отправки формы
  const handleSubmit = (event) => {
    event.preventDefault();
    if (username.trim() === '') {
      setError('Имя пользователя не должно быть пустым');
    } else {
      alert(`Имя пользователя: ${username}`);
      setError('');
    }
  };

  return (
    <div>
      <h1>Форма ввода имени пользователя</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Имя пользователя:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleChange}
            onBlur={handleBlur} // Обработка потери фокуса
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

// Пример использования UsernameForm в другом компоненте
function App() {
  return (
    <div>
      <UsernameForm />
    </div>
  );
}

export default App;

// Итог:
// Реагирование на потерю фокуса может быть полезным для валидации данных формы и улучшения пользовательского опыта.
// В этом примере мы использовали событие onBlur для проверки, что поле имени пользователя не пустое, и отображения сообщения об ошибке, если оно пустое.
