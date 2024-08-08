// Глава 20: Создание фронтенд и бекэнд приложения - Отправка запроса с фронтенда в бекенд в Node.js

// В этой главе мы рассмотрим, как отправить запрос с фронтенда на бекэнд, используя Node.js на сервере.
// Для этого мы будем использовать библиотеку Axios для отправки HTTP-запросов с фронтенда и Express.js для обработки запросов на сервере.

// 1. Настройка бекэнд приложения с использованием Express.js:

// Устанавливаем необходимые зависимости:
// npm install express body-parser cors

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Настройка middleware
app.use(cors()); // Разрешаем запросы с других доменов
app.use(bodyParser.json()); // Парсим JSON тела запросов

// Определяем маршрут для обработки POST-запроса
app.post('/api/data', (req, res) => {
  const { name, age } = req.body;
  console.log(`Received data: Name - ${name}, Age - ${age}`);
  res.json({ message: 'Data received successfully!' });
});

// Запускаем сервер
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// 2. Настройка фронтенд приложения для отправки запроса:

// Устанавливаем Axios:
// npm install axios

import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Отправляем POST-запрос на сервер
      const response = await axios.post('http://localhost:3001/api/data', { name, age });
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error('Error sending data:', error);
      setResponseMessage('Error sending data');
    }
  };

  return (
    <div>
      <h1>Send Data to Backend</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <br />
        <button type="submit">Send</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default App;

// Итог:
// Мы настроили сервер на Express.js для обработки POST-запросов и отправили данные с фронтенда на сервер с помощью Axios.
// Этот процесс демонстрирует, как фронтенд и бекэнд могут взаимодействовать в приложении на базе Node.js.
