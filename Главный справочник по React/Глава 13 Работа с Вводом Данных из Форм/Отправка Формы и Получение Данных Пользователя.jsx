// Глава 13: Работа с Вводом Данных из Форм

// Отправка формы и получение данных пользователя являются важными аспектами в разработке React-приложений.
// Это позволяет взаимодействовать с пользователем, собирать данные и обрабатывать их для различных целей.

// Основные шаги:
// 1. Создание формы с элементами ввода.
// 2. Управление состоянием формы с помощью хуков useState.
// 3. Обработка отправки формы и получения данных.

// Пример использования хуков useState для управления состоянием формы и обработки её отправки:

import React, { useState } from 'react';

function UserForm() {
  const [name, setName] = useState(''); // состояние для хранения имени
  const [email, setEmail] = useState(''); // состояние для хранения email
  const [submitted, setSubmitted] = useState(false); // состояние для отслеживания отправки формы

  const handleSubmit = (event) => {
    event.preventDefault(); // предотвращаем перезагрузку страницы
    setSubmitted(true); // устанавливаем состояние отправки формы в true
    console.log('Имя:', name); // выводим имя в консоль
    console.log('Email:', email); // выводим email в консоль
    // Здесь вы можете добавить код для отправки данных на сервер или другой обработки
  };

  return (
    <div>
      <h1>Форма пользователя</h1>
      {/* Форма с обработчиком отправки */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Имя:
            {/* Поле ввода имени с управляемым состоянием */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            {/* Поле ввода email с управляемым состоянием */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Отправить</button>
      </form>
      {/* Отображение данных после отправки формы */}
      {submitted && (
        <div>
          <h2>Данные пользователя:</h2>
          <p>Имя: {name}</p>
          <p>Email: {email}</p>
        </div>
      )}
    </div>
  );
}

// Пример использования UserForm в другом компоненте
function App() {
  return (
    <div>
      <h1>Пример работы с формой в React</h1>
      <UserForm />
    </div>
  );
}

export default App;

// Итог:
// Работа с вводом данных из форм в React включает создание управляемых компонентов ввода, 
// управление их состоянием и обработку отправки формы. Это позволяет эффективно собирать и 
// обрабатывать данные пользователя, обеспечивая интерактивный и динамичный пользовательский интерфейс.
