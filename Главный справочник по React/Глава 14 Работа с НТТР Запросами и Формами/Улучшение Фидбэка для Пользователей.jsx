// Глава 14: Работа с HTTP Запросами и Формами

// Улучшение фидбэка для пользователей при отправке форм и выполнении HTTP запросов является ключевым аспектом для создания 
// удобного и интуитивно понятного пользовательского интерфейса. Это позволяет пользователям понимать, что происходит после 
// отправки формы и обеспечивает своевременную обратную связь.

// Основные состояния формы:
// 1. Idle (Неактивное состояние) — форма готова к заполнению и отправке.
// 2. Submitting (Отправка) — данные формы отправляются на сервер.
// 3. Success (Успешно) — данные формы успешно отправлены и обработаны.
// 4. Error (Ошибка) — произошла ошибка при отправке данных формы.

// Пример реализации формы с улучшенным фидбэком для пользователей:

import React, { useState } from 'react';

function FeedbackForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // состояние формы
  const [responseMessage, setResponseMessage] = useState(''); // сообщение о результате

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setResponseMessage('');

    try {
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

      const result = await response.json();
      setStatus('success');
      setResponseMessage('Ваше сообщение успешно отправлено!');
    } catch (error) {
      setStatus('error');
      setResponseMessage('Произошла ошибка при отправке формы.');
    }
  };

  return (
    <div>
      <h1>Обратная связь</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Сообщение:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
      {status === 'error' && <div style={{ color: 'red' }}>{responseMessage}</div>}
      {status === 'success' && <div style={{ color: 'green' }}>{responseMessage}</div>}
    </div>
  );
}

// Пример использования FeedbackForm в приложении
function App() {
  return (
    <div>
      <h1>Форма обратной связи с улучшенным фидбэком</h1>
      <FeedbackForm />
    </div>
  );
}

export default App;

// Итог:
// Улучшение фидбэка для пользователей при отправке форм и выполнении HTTP запросов повышает удобство использования приложения.
// Четкое информирование пользователя о статусе отправки формы (идет отправка, успешно или произошла ошибка) помогает создать 
// более интуитивно понятный и отзывчивый интерфейс.
