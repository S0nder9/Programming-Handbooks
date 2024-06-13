// Глава 14: Работа с HTTP Запросами и Формами

// Управление состоянием загрузки является важным аспектом при работе с HTTP запросами и формами в React.
// Это позволяет пользователю видеть состояние запроса (загрузка, успешное выполнение, ошибка).

import React, { useState } from 'react';

// Компонент для отправки формы и управления состоянием загрузки
function FormWithLoading() {
  const [formData, setFormData] = useState({ name: '', email: '' }); // состояние для хранения данных формы
  const [loading, setLoading] = useState(false); // состояние для отслеживания загрузки
  const [error, setError] = useState(null); // состояние для хранения ошибки
  const [success, setSuccess] = useState(false); // состояние для хранения успешного выполнения запроса

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // устанавливаем состояние загрузки
    setError(null); // сбрасываем состояние ошибки
    setSuccess(false); // сбрасываем состояние успешного выполнения

    try {
      const response = await fetch('https://api.example.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Ошибка сети');
      }

      const result = await response.json();
      setSuccess(true); // устанавливаем состояние успешного выполнения
    } catch (error) {
      setError(error); // устанавливаем состояние ошибки
    } finally {
      setLoading(false); // сбрасываем состояние загрузки
    }
  };

  return (
    <div>
      <h1>Отправка формы с управлением состоянием загрузки</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Имя:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : 'Отправить'}
        </button>
      </form>

      {error && <div>Ошибка: {error.message}</div>}
      {success && <div>Форма успешно отправлена!</div>}
    </div>
  );
}

// Пример использования компонента FormWithLoading в другом компоненте
function App() {
  return (
    <div>
      <h1>Пример работы с HTTP запросами и формами в React</h1>
      <FormWithLoading />
    </div>
  );
}

export default App;

// Итог:
// Управление состоянием загрузки при работе с HTTP запросами и формами в React позволяет создать более отзывчивый и надежный интерфейс.
// Этот пример демонстрирует, как можно использовать состояние для отображения загрузки, обработки ошибок и успешного выполнения запроса.
