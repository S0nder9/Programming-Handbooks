// Глава 14: Работа с HTTP запросами и формами

// Получение данных из формы является важным аспектом при работе с HTTP запросами в React-приложениях.
// Это позволяет собирать пользовательский ввод и отправлять его на сервер для обработки.

// Пример использования формы для сбора данных и отправки HTTP запроса:
import React, { useState } from 'react';

function FormComponent() {
  const [name, setName] = useState(''); // состояние для хранения имени
  const [email, setEmail] = useState(''); // состояние для хранения email
  const [message, setMessage] = useState(''); // состояние для хранения сообщения
  const [response, setResponse] = useState(null); // состояние для хранения ответа сервера

  const handleSubmit = async (e) => {
    e.preventDefault(); // предотвращаем перезагрузку страницы при отправке формы

    // создаем объект с данными формы
    const formData = {
      name,
      email,
      message,
    };

    try {
      // выполняем HTTP запрос методом POST
      const res = await fetch('https://api.example.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json(); // парсим ответ как JSON
      setResponse(result); // сохраняем ответ в состояние
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  return (
    <div>
      <h1>Форма обратной связи</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Сообщение:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
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

// Пример использования FormComponent в другом компоненте
function App() {
  return (
    <div>
      <h1>Пример работы с формами и HTTP запросами в React</h1>
      <FormComponent />
    </div>
  );
}

export default App;

// Итог:
// Получение данных из формы и отправка HTTP запросов является ключевым аспектом взаимодействия с пользователями в веб-приложениях.
// Использование состояния и обработчиков событий позволяет эффективно управлять пользовательским вводом и отправлять данные на сервер для обработки.
