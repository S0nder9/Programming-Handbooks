// Глава 14: Работа с HTTP запросами и формами

// Валидация формы является важным аспектом при создании веб-приложений. Она помогает гарантировать, 
// что пользователи вводят данные в правильном формате перед отправкой формы на сервер.
// В React это можно делать с помощью состояния (state) и обработчиков событий (event handlers).

import React, { useState } from 'react';

function FormValidationComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  // Функция для проверки валидности email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Функция для обработки отправки формы
  const handleSubmit = (event) => {
    event.preventDefault();
    let validationErrors = {};

    // Проверка имени
    if (!name) {
      validationErrors.name = 'Name is required';
    }

    // Проверка email
    if (!email) {
      validationErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      validationErrors.email = 'Email is not valid';
    }

    // Устанавливаем ошибки, если они есть
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Если ошибок нет, отправляем форму (или делаем что-то еще)
      console.log('Form submitted successfully');
      console.log('Name:', name);
      console.log('Email:', email);

      // Сбрасываем форму
      setName('');
      setEmail('');
      setErrors({});
    }
  };

  return (
    <div>
      <h1>Форма с валидацией</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

// Пример использования компонента FormValidationComponent в другом компоненте
function App() {
  return (
    <div>
      <h1>Пример валидации формы в React</h1>
      <FormValidationComponent />
    </div>
  );
}

export default App;

// Итог:
// Валидация формы в React помогает убедиться, что пользователь вводит корректные данные перед отправкой формы. 
// Это достигается с помощью использования состояния для отслеживания значений полей и ошибок, 
// а также написания функций для проверки данных.
