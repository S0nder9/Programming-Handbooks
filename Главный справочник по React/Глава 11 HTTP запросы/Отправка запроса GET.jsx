// Глава 11: HTTP запросы

// Отправка запроса GET
// В React отправка запроса GET обычно осуществляется с использованием встроенного метода fetch или сторонней библиотеки, такой как Axios.
// Эти инструменты позволяют взаимодействовать с внешними API и получать данные для использования в компонентах.

// Как создается, где используется
// Запрос GET создается путем вызова функции fetch с URL-адресом API. Он используется для получения данных с сервера, таких как списки товаров, профили пользователей и т.д.
// Fetch возвращает промис, который можно использовать для обработки полученных данных.

// Актуально ли
// Отправка запросов GET актуальна для большинства веб-приложений, так как позволяет динамически получать и обновлять данные с серверов.

// Несколько примеров
import React, { useEffect, useState } from 'react';

// Пример использования fetch для отправки GET запроса
const DataFetchingComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Отправка GET запроса
    fetch('https://api.example.com/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  return (
    <div>
      <h1>Полученные данные:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

// Пример использования Axios для отправки GET запроса
import axios from 'axios';

const DataFetchingWithAxios = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Отправка GET запроса с использованием Axios
    axios.get('https://api.example.com/data')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  return (
    <div>
      <h1>Полученные данные с Axios:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

// Итог
// Отправка запросов GET с использованием fetch или Axios позволяет динамически получать данные с серверов в React-приложениях.
// Это делает приложения более интерактивными и функциональными, предоставляя пользователям актуальную информацию.

export { DataFetchingComponent, DataFetchingWithAxios };
