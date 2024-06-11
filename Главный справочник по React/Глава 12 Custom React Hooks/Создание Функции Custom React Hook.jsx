// Глава 12: Custom React Hooks

// Custom React Hooks позволяют вам извлекать и переиспользовать логику состояния между компонентами.
// Это помогает сделать ваш код более чистым и модульным.

// Создание Custom Hook:
// Custom Hook — это обычная функция JavaScript, имя которой начинается с "use". 
// Она может использовать другие хуки, такие как useState, useEffect и т.д.

// Пример: Создание Custom Hook для управления состоянием формы

import React, { useState } from 'react';

// Создание Custom Hook
function useForm(initialState) {
  const [values, setValues] = useState(initialState);

  // Функция для обработки изменений в полях формы
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Возвращаем текущие значения и функцию handleChange
  return [values, handleChange];
}

// Компонент, использующий Custom Hook
function FormComponent() {
  const [formValues, handleFormChange] = useForm({
    username: '',
    email: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleFormChange}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleFormChange}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

// Пример использования FormComponent в другом компоненте
function App() {
  return (
    <div>
      <h1>Пример Custom Hook в React</h1>
      <FormComponent />
    </div>
  );
}

export default App;

// Итог:
// Создание Custom Hook позволяет вам инкапсулировать и переиспользовать логику состояния между различными компонентами.
// Это помогает поддерживать ваш код чистым и модульным, улучшая читаемость и поддержку кода.
