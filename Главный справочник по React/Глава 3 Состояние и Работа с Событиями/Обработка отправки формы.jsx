// Глава 3: Состояние и Работа с Событиями

// Подглава 3.1: Обработка отправки формы

// В React обработка отправки формы осуществляется обычно через использование состояния компонента,
// чтобы отслеживать значения полей формы, и обработчика события onSubmit формы.

// Пример компонента формы в React с обработчиком отправки:

import React, { useState } from 'react';

const FormExample = () => {
  // Используем состояние для отслеживания значений полей формы
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Обработчик изменения значений полей формы
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Обработчик отправки формы
  const handleSubmit = (event) => {
    event.preventDefault();
    // Добавьте здесь логику отправки данных формы, например, на сервер
    console.log('Отправленные данные:', formData);
    // Очищаем поля формы после отправки
    setFormData({
      username: '',
      password: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Имя пользователя:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default FormExample;
