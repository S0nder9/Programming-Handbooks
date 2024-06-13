// Глава 14: Работа с HTTP запросами и формами
// Перенос данных в Firebase

// В этой главе мы рассмотрим, как можно перенести данные из формы в Firebase, используя HTTP запросы в React-приложении.

// Firebase предоставляет мощную и простую в использовании базу данных в реальном времени, которая отлично подходит для веб-приложений.
// В этом примере мы будем использовать Firebase Realtime Database для хранения данных, полученных из формы.

// Настройка Firebase:
// 1. Создайте новый проект в Firebase Console (https://console.firebase.google.com/).
// 2. Добавьте приложение и получите конфигурационные данные Firebase.
// 3. Установите пакет firebase в ваше React-приложение: npm install firebase

import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

// Конфигурация Firebase (замените на вашу конфигурацию)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Инициализация Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function DataForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await firebase.database().ref('contacts').push({
        name,
        email,
        message
      });
      setLoading(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Отправка данных в Firebase</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Сообщение:</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
        </div>
        <button type="submit" disabled={loading}>Отправить</button>
      </form>
      {loading && <p>Отправка данных...</p>}
      {success && <p>Данные успешно отправлены!</p>}
      {error && <p>Ошибка: {error}</p>}
    </div>
  );
}

function App() {
  return (
    <div>
      <DataForm />
    </div>
  );
}

export default App;

// Итог:
// В этом примере мы рассмотрели, как отправить данные из формы в Firebase, используя HTTP запросы в React.
// Мы настроили соединение с Firebase, создали форму для ввода данных, и отправили данные в Firebase Realtime Database.
