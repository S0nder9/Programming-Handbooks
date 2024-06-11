// Глава 11: HTTP запросы

// Обработка HTTP ошибок является важной частью работы с HTTP запросами в React-приложениях.
// Правильная обработка ошибок позволяет предоставить пользователю полезную информацию о проблемах,
// которые могут возникнуть при загрузке данных.

// В этом примере мы рассмотрим, как обрабатывать ошибки при выполнении HTTP запросов с использованием хуков useState и useEffect.

import React, { useState, useEffect } from 'react';

function DataFetchingComponent() {
  const [data, setData] = useState(null); // состояние для хранения данных
  const [loading, setLoading] = useState(true); // состояние для отслеживания загрузки
  const [error, setError] = useState(null); // состояние для хранения ошибки

  useEffect(() => {
    // Функция для выполнения HTTP запроса
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data'); // выполняем запрос
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`); // бросаем ошибку, если ответ не ок
        }
        const result = await response.json(); // парсим ответ как JSON
        setData(result); // сохраняем данные в состояние
      } catch (error) {
        setError(error); // сохраняем ошибку в состояние
      } finally {
        setLoading(false); // устанавливаем состояние загрузки в false
      }
    };

    fetchData(); // вызываем функцию для загрузки данных
  }, []); // пустой массив зависимостей, чтобы useEffect сработал только при монтировании компонента

  if (loading) {
    return <div>Загрузка...</div>; // отображаем индикатор загрузки
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>; // отображаем сообщение об ошибке
  }

  return (
    <div>
      {/* Отображаем данные */}
      <h1>Данные:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

// Пример использования DataFetchingComponent в другом компоненте
function App() {
  return (
    <div>
      <h1>Пример HTTP запросов в React</h1>
      <DataFetchingComponent />
    </div>
  );
}

export default App;

// Итог:
// Обработка HTTP ошибок позволяет создать более стабильные и надежные приложения,
// которые могут адекватно реагировать на различные проблемы, возникающие при выполнении запросов к серверу.
// В этом примере мы использовали try...catch для перехвата ошибок и отобразили их пользователю.
