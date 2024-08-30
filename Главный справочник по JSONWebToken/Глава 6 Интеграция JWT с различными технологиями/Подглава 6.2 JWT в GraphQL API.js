// Глава 6: Интеграция JWT с различными технологиями
// Подглава 6.2: JWT в GraphQL API

// Аутентификация и авторизация в GraphQL с использованием JWT

// GraphQL предоставляет гибкий способ работы с данными и позволяет эффективно запросить только те данные, которые нужны.
// Внедрение JWT (JSON Web Tokens) для аутентификации и авторизации в GraphQL API помогает обеспечить безопасность и управление доступом.

// Основные шаги интеграции JWT с GraphQL:

// 1. Генерация JWT при аутентификации
// Когда пользователь проходит аутентификацию (например, логинится), сервер создает JWT и возвращает его клиенту.
// Этот токен будет использоваться для аутентификации запросов к GraphQL API.

const jwt = require('jsonwebtoken');

// Пример создания JWT на сервере:
const generateToken = (user) => {
  return jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
};

// 2. Передача JWT в запросах
// После получения JWT клиент должен передавать его в заголовке `Authorization` каждого запроса к серверу GraphQL.

// Пример отправки запроса с JWT на фронтенде:
const token = 'your-jwt-token';

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    query: `
      query {
        user {
          id
          name
        }
      }
    `
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// 3. Проверка JWT на сервере
// На сервере GraphQL необходимо проверять JWT в каждом запросе для обеспечения доступа к защищенным данным.
// Можно использовать middleware для проверки токена перед выполнением запроса GraphQL.

const { ApolloServer, gql } = require('apollo-server');
const { AuthenticationError } = require('apollo-server-errors');

// Пример middleware для проверки JWT:
const context = ({ req }) => {
  const token = req.headers.authorization || '';
  if (token) {
    try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), 'your-secret-key');
      return { userId: decoded.userId };
    } catch (e) {
      throw new AuthenticationError('Invalid or expired token');
    }
  }
  return {};
};

// Пример использования ApolloServer:
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
  }

  type Query {
    user: User
  }
`;

const resolvers = {
  Query: {
    user: (parent, args, context) => {
      if (!context.userId) {
        throw new AuthenticationError('You must be logged in');
      }
      // Получение пользователя из базы данных по userId
      return { id: context.userId, name: 'John Doe' };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// Итог:
// Интеграция JWT с GraphQL API включает в себя генерацию токенов при аутентификации, передачу их в запросах и проверку на сервере.
// Это обеспечивает защиту данных и контроль доступа в GraphQL приложениях.
