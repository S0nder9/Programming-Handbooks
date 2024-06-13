// Глава 14: Работа с HTTP запросами и формами

// Отправка данных на сервер является важной частью взаимодействия между клиентом и сервером в веб-приложениях.
// В React для этого часто используются формы и методы HTTP, такие как POST, для отправки данных.

// Основные шаги для отправки данных на сервер:
// 1. Создание формы для ввода данных пользователем.
// 2. Обработка события отправки формы.
// 3. Отправка данных на сервер с помощью fetch() или других библиотек (например, axios).
// 4. Управление состояниями (загрузка, успех, ошибка) и отображение соответствующих сообщений пользователю.

// Пример: Создание и отправка формы с данными на сервер
import React, { useState } from 'react';

function DataSubmissionForm() {
  const [name, setName] = useState(''); // состояние для хранения имени
  const [email, setEmail] = useState(''); // состояние для хранения email
  const [loading, setLoading] = useState(false); // состояние для отслеживания загрузки
  const [success, setSuccess] = useState(false); // состояние для успешной отправки
  const [error, setError] = useState(null); // состояние для хранения ошибки

  const handleSubmit = async (event) => {
    event.preventDefault(); // предотвращаем перезагрузку страницы

    setLoading(true); // начинаем загрузку
    setError(null); // очищаем ошибку
    setSuccess(false); // очищаем успешное сообщение

    // объект данных, который будет отправлен на сервер
    const data = {
      name: name,
      email: email,
    };

    try {
      const response = await fetch('https://api.example.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // указываем, что отправляем JSON
        },
        body: JSON.stringify(data), // конвертируем объект данных в JSON
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json(); // парсим ответ как JSON
      console.log('Success:', result);
      setSuccess(true); // устанавливаем состояние успешной отправки
    } catch (error) {
      console.error('Error:', error);
      setError(error); // сохраняем ошибку в состояние
    } finally {
      setLoading(false); // заканчиваем загрузку
    }
  };

  return (
    <div>
      <h1>Отправка данных на сервер</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Имя:
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
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
      {success && <div>Данные успешно отправлены!</div>}
      {error && <div>Ошибка: {error.message}</div>}
    </div>
  );
}

// Пример использования DataSubmissionForm в другом компоненте
function App() {
  return (
    <div>
      <h1>Пример отправки данных на сервер</h1>
      <DataSubmissionForm />
    </div>
  );
}

export default App;

// Итог:
// Отправка данных на сервер включает создание формы, обработку события отправки, 
// отправку данных с помощью fetch() и управление состояниями загрузки, успеха и ошибки. 
// Это позволяет пользователям взаимодействовать с сервером, отправляя и получая данные.
