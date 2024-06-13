// Глава 13: Работа с Вводом Данных из Форм

// Работа с формами в React может быть сложной из-за необходимости управления состоянием, валидации данных,
// и обеспечения отзывчивости интерфейса. В этой главе мы рассмотрим основные сложности работы с формами
// и предоставим пример, который демонстрирует наиболее понятный способ управления вводом данных из форм.

import React, { useState } from 'react';

function SimpleForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Функция для обновления состояния формы при изменении полей ввода
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Функция для валидации данных формы
  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = 'Имя обязательно';
    if (!formData.email) tempErrors.email = 'Email обязателен';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email некорректен';
    if (!formData.message) tempErrors.message = 'Сообщение обязательно';
    return tempErrors;
  };

  // Функция для обработки отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Имитация отправки данных формы
      console.log('Submitted data:', formData);
      setSubmitted(true);
      setErrors({});
    }
  };

  if (submitted) {
    return <div>Форма успешно отправлена!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Имя:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="message">Сообщение:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <span className="error">{errors.message}</span>}
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
}

function App() {
  return (
    <div>
      <h1>Пример работы с формой в React</h1>
      <SimpleForm />
    </div>
  );
}

export default App;

// Итог:
// Работа с формами в React требует внимательного управления состоянием, валидации и обработки ошибок.
// Этот пример показывает, как можно эффективно управлять вводом данных из формы, валидацией и отправкой данных,
// чтобы создать более отзывчивый и надежный интерфейс для пользователей.
