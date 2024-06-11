// Глава 12: Custom React Hooks

// Custom Hooks позволяют извлекать и повторно использовать логику состояния и эффектов в различных компонентах React.
// Они являются мощным инструментом для улучшения читаемости и повторного использования кода.

// Определение и использование Custom Hooks
// Custom Hooks - это функции, чье имя начинается с "use" и которые могут вызывать другие хуки внутри себя.
// Они позволяют вам выносить логику состояния и эффектов в отдельные функции, что делает ваш код более чистым и модульным.

// Пример создания и использования Custom Hook:

import React, { useState, useEffect } from 'react';

// Определение Custom Hook для получения данных
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Пример компонента, использующего Custom Hook
function DataFetchingComponent({ url }) {
  const { data, loading, error } = useFetch(url);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  return (
    <div>
      <h1>Данные:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

// Пример использования DataFetchingComponent в другом компоненте
function App() {
  return (
    <div>
      <h1>Пример использования Custom Hook в React</h1>
      <DataFetchingComponent url="https://api.example.com/data" />
    </div>
  );
}

export default App;

// Итог:
// Custom Hooks позволяют легко выносить повторяющуюся логику в отдельные функции, что улучшает структуру и поддерживаемость кода.
// Они следуют тем же правилам, что и стандартные хуки, и могут вызывать другие хуки внутри себя, предоставляя мощный способ повторного использования логики.
