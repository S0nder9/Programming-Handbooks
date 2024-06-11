// Глава 11: HTTP запросы

// Управление загрузкой и состояниями данных является важным аспектом при работе с HTTP запросами в React-приложениях.
// Это позволяет информировать пользователей о текущем состоянии запроса (загрузка, успешное получение данных, ошибка).

// Основные состояния:
// 1. Loading (Загрузка) — данные запрашиваются.
// 2. Success (Успешно) — данные успешно получены.
// 3. Error (Ошибка) — произошла ошибка при запросе данных.

// Для управления этими состояниями часто используют хуки useState и useEffect.

// Пример использования хуков useState и useEffect для управления загрузкой данных:
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
          throw new Error('Network response was not ok');
        }
        const result = await response.json(); // парсим ответ как JSON
        setData(result); // сохраняем данные в состояние
        setLoading(false); // устанавливаем состояние загрузки в false
      } catch (error) {
        setError(error); // сохраняем ошибку в состояние
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
// Управление загрузкой и состояниями данных является важной частью разработки React-приложений, 
// особенно при работе с HTTP запросами. Это позволяет создать более отзывчивый и надежный интерфейс, 
// который адекватно реагирует на различные состояния запроса.
