// Глава 4: Аутентификация и авторизация с использованием JWT

// Подглава 4.2: Авторизация на основе ролей с использованием JWT

// В этой подглаве мы рассмотрим, как реализовать авторизацию на основе ролей с использованием JWT (JSON Web Tokens).
// Мы обсудим, как включить информацию о ролях и разрешениях в Payload JWT и как проверять эти роли и разрешения на сервере.

// Включение информации о ролях и разрешениях в Payload JWT

// При создании JWT вы можете добавить информацию о ролях и разрешениях пользователя в Payload.
// Это позволяет серверу проверять, имеет ли пользователь достаточные права для доступа к определенным ресурсам.

// Пример создания JWT с информацией о ролях:
const jwt = require('jsonwebtoken');

// Создаем токен с информацией о пользователе и его ролях
const user = {
  id: 1,
  username: 'john_doe',
  roles: ['admin', 'user'] // Указываем роли пользователя
};

// Создаем JWT
const token = jwt.sign(user, 'your-secret-key', { expiresIn: '1h' });

// Пример декодирования JWT и получения информации о ролях:
const decodedToken = jwt.verify(token, 'your-secret-key');
console.log(decodedToken.roles); // Выведет: ['admin', 'user']

// Проверка ролей и разрешений на сервере для управления доступом к ресурсам

// На сервере вы можете проверять роли и разрешения из JWT для управления доступом к ресурсам.
// Это поможет защитить маршруты и ресурсы от несанкционированного доступа.

// Пример проверки ролей на сервере с использованием Express.js и JWT:
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

// Middleware для проверки JWT и извлечения ролей
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = user; // Сохраняем информацию о пользователе в запросе
    next();
  });
};

// Middleware для проверки ролей
const authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!roles.some(role => req.user.roles.includes(role))) {
      return res.status(403).send('Access Forbidden');
    }
    next();
  };
};

// Пример защищенного маршрута, доступного только пользователям с ролью 'admin'
app.get('/admin', authenticateToken, authorizeRoles(['admin']), (req, res) => {
  res.send('Welcome Admin');
});

// Пример защищенного маршрута, доступного пользователям с ролью 'user' или 'admin'
app.get('/profile', authenticateToken, authorizeRoles(['user', 'admin']), (req, res) => {
  res.send('Welcome User');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Итог:
// Включение информации о ролях и разрешениях в Payload JWT и проверка этих данных на сервере позволяет эффективно управлять доступом к ресурсам.
// Это обеспечивает безопасность вашего приложения и позволяет реализовывать гибкую авторизацию на основе ролей.
