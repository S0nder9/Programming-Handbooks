// Глава 12: Отправка данных с сайта в Телеграм

// В данном разделе мы рассмотрим, как отправлять данные с вашего сайта в Telegram через бота.
// Для этого потребуется создать бота в Telegram и использовать его токен для отправки сообщений в определенный чат.

// Шаги:
// 1. Создать бота в Telegram через @BotFather и получить токен бота.
// 2. Узнать ID чата, куда будут отправляться сообщения.
// 3. Использовать fetch для отправки POST-запроса на API Telegram.

// Пример создания и использования формы для отправки данных в Telegram:

import React, { useState } from 'react';

// Компонент для отправки формы
function TelegramForm() {
  const [name, setName] = useState(''); // Состояние для хранения имени
  const [message, setMessage] = useState(''); // Состояние для хранения сообщения
  const [status, setStatus] = useState(''); // Состояние для отображения статуса

  // Функция для обработки отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    setStatus('Отправка...');

    // Токен вашего бота
    const botToken = '7442718434:AAGyH4vpMGhtYcmMkQJA506EnH6KpM0A6zY';
    // ID чата, куда будут отправляться сообщения (может быть ID группы или личного чата)
    const chatId = 'https://t.me/S0nder9';

    // Сообщение, которое будет отправлено в Telegram
    const text = `Имя: ${name}\nСообщение: ${message}`;

    // URL API Telegram для отправки сообщения
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
      // Отправка POST-запроса на API Telegram
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Успех:', result);
      setStatus('Сообщение отправлено!');
    } catch (error) {
      console.error('Ошибка:', error);
      setStatus('Ошибка при отправке сообщения.');
    }
  };

  return (
    <div>
      <h1>Отправка данных в Telegram</h1>
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
            Сообщение:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Отправить</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

// Пример использования TelegramForm в компоненте App
function App() {
  return (
    <div>
      <TelegramForm />
    </div>
  );
}

export default App;

// Итог:
// В данном примере мы рассмотрели, как отправлять данные с вашего сайта в Telegram с использованием бота.
// Мы создали простую форму, которая отправляет POST-запрос на API Telegram для отправки сообщений в чат.
// Это позволяет интегрировать функционал отправки уведомлений или других данных из вашего сайта в Telegram.
