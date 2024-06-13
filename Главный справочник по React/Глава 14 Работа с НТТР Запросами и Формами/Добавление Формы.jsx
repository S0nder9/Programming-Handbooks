// Глава 14: Работа с HTTP Запросами и Формами

// Введение
// Формы являются важной частью любого веб-приложения. Они позволяют пользователям вводить и отправлять данные.
// В этом примере мы создадим простую форму для ввода данных и отправки их на сервер с использованием HTTP-запроса.

// Пример: Форма с отправкой данных на сервер

import React, { useState } from 'react';

function FormComponent() {
  // Создаем состояния для хранения значений полей формы и состояния отправки
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Функция обработки отправки формы
  const handleSubmit = async (event) => {
    event.preventDefault(); // предотвращаем перезагрузку страницы

    setLoading(true); // устанавливаем состояние загрузки

    try {
      const res = await fetch('https://api.example.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }), // отправляем данные формы в формате JSON
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await res.json();
      setResponse(result); // сохраняем ответ от сервера
      setLoading(false); // убираем состояние загрузки
    } catch (error) {
      setError(error); // сохраняем ошибку
      setLoading(false); // убираем состояние загрузки
    }
  };

  return (
    <div>
      <h1>Отправить сообщение</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Имя:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} // обновляем состояние имени
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // обновляем состояние email
              required
            />
          </label>
        </div>
        <div>
          <label>
            Сообщение:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)} // обновляем состояние сообщения
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
      {response && (
        <div>
          <h2>Ответ сервера:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div>
          <h2>Ошибка:</h2>
          <p>{error.message}</p>
        </div>
      )}
    </div>
  );
}

// Пример использования FormComponent в основном компоненте
function App() {
  return (
    <div>
      <h1>Пример формы с HTTP запросом</h1>
      <FormComponent />
    </div>
  );
}

export default App;

// Итог:
// В этом примере мы создали простую форму с полями для ввода имени, email и сообщения. 
// При отправке формы данные отправляются на сервер с использованием HTTP POST запроса. 
// Мы также реализовали обработку различных состояний: загрузки, успешного ответа и ошибок.
