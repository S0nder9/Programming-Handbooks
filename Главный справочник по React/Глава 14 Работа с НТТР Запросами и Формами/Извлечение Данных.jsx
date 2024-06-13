// Глава 14: Работа с HTTP запросами и Формами

// Извлечение Данных из форм является важной задачей при разработке веб-приложений. 
// Рассмотрим, как можно собирать данные из форм и отправлять их на сервер с помощью HTTP запросов.

// Основные шаги:
// 1. Создание формы и управление её состоянием.
// 2. Обработка события отправки формы.
// 3. Выполнение HTTP запроса для отправки данных на сервер.

// Пример использования формы и отправки данных на сервер:

import React, { useState } from 'react';

function FormDataComponent() {
  // Состояния для хранения значений полей формы
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);

  // Обработчик изменения значения в поле
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'message') {
      setMessage(value);
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault(); // предотвращаем перезагрузку страницы при отправке формы

    // Создаем объект с данными формы
    const formData = {
      name,
      email,
      message,
    };

    try {
      // Выполняем HTTP запрос на сервер
      const response = await fetch('https://api.example.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json(); // парсим ответ как JSON
      setResponse(result); // сохраняем ответ сервера в состояние
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponse({ error: error.message }); // сохраняем ошибку в состояние
    }
  };

  return (
    <div>
      <h1>Форма обратной связи</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Имя:
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Сообщение:
            <textarea
              name="message"
              value={message}
              onChange={handleInputChange}
            ></textarea>
          </label>
        </div>
        <button type="submit">Отправить</button>
      </form>
      {response && (
        <div>
          <h2>Ответ сервера:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// Пример использования FormDataComponent в компоненте App
function App() {
  return (
    <div>
      <h1>Пример работы с HTTP запросами и формами в React</h1>
      <FormDataComponent />
    </div>
  );
}

export default App;

// Итог:
// Работа с формами и HTTP запросами в React включает в себя управление состоянием полей формы, 
// обработку событий и отправку данных на сервер. Это позволяет собирать данные от пользователей 
// и взаимодействовать с сервером для выполнения различных задач, таких как регистрация, авторизация и отправка сообщений.
