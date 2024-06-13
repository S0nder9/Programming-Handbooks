// Глава 13: Работа с вводом данных из форм

// Управление валидацией всей формы — это процесс проверки корректности всех данных, введенных пользователем, перед их отправкой.
// Валидация формы может быть синхронной (проверка на клиенте) или асинхронной (например, проверка уникальности имени пользователя на сервере).

// В React для управления валидацией форм часто используют хуки useState для управления состоянием формы и валидации.

import React, { useState } from 'react';

// Пример компонента с формой и валидацией
function FormValidationComponent() {
  // Состояния для управления данными формы и ошибками
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  // Функция для управления изменениями в полях формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Функция для проверки валидности полей формы
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Имя пользователя обязательно';
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email некорректен';
    }
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }
    return newErrors;
  };

  // Функция для обработки отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Данные формы валидны, можно отправлять
      console.log('Форма отправлена:', formData);
      // Сброс данных формы
      setFormData({
        username: '',
        email: '',
        password: '',
      });
      setErrors({});
    }
  };

  return (
    <div>
      <h1>Форма с валидацией</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Имя пользователя:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>
        <div>
          <label>
            Пароль:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
        </div>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

// Пример использования FormValidationComponent в другом компоненте
function App() {
  return (
    <div>
      <h1>Пример работы с формами в React</h1>
      <FormValidationComponent />
    </div>
  );
}

export default App;

// Итог:
// Управление валидацией всей формы является важной частью работы с формами в React.
// Это помогает обеспечить корректность вводимых данных и улучшить пользовательский опыт.
// В данном примере используется базовая валидация, но можно добавить и более сложные проверки, 
