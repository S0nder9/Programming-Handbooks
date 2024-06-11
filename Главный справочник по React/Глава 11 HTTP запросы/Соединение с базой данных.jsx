// Глава 11: HTTP запросы

// Соединение с базой данных
// Соединение с базой данных является важной частью разработки приложений, позволяя хранить и извлекать данные, необходимые для работы приложения.
// В контексте React, соединение с базой данных обычно осуществляется через API или напрямую с использованием клиентских библиотек для базы данных.

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Как создается, где используется
// В React соединение с базой данных создается через API, который выполняет запросы к серверу, где уже происходит взаимодействие с базой данных.
// Прямое подключение к базе данных из клиентского кода не рекомендуется из соображений безопасности.

const DatabaseComponent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Пример запроса к API для получения данных из базы данных
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/data');
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  return (
    <div>
      <h1>Данные из базы данных</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

// Актуально ли
// Соединение с базой данных остается актуальным и необходимым в большинстве приложений, так как данные являются неотъемлемой частью любого приложения.
// Современные приложения часто используют RESTful API или GraphQL для взаимодействия с сервером и базой данных.

export default DatabaseComponent;

// Несколько примеров

// Пример использования RESTful API для получения данных
const FetchDataComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Ошибка при получении данных:', error));
  }, []);

  return (
    <div>
      <h2>Пользователи</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

// Пример использования GraphQL для получения данных
import { ApolloClient, InMemoryCache, gql, ApolloProvider, useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql.example.com',
  cache: new InMemoryCache()
});

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

const UsersList = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  return (
    <ul>
      {data.users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <UsersList />
  </ApolloProvider>
);

// Итог
// Соединение с базой данных является критически важным аспектом разработки современных приложений.
// В React это обычно осуществляется через API, который взаимодействует с сервером и базой данных.
// Это обеспечивает безопасность и позволяет эффективно управлять данными.

export { DatabaseComponent, FetchDataComponent, App };
