// Глава 4: Аутентификация и авторизация с использованием JWT
// Подглава 4.3: Реализация логики выхода (Logout)

// Методы завершения сеанса пользователя с использованием JWT

// Завершение сеанса пользователя при использовании JWT может быть выполнено несколькими способами:
// 1. Удаление токена на клиенте
// 2. Управление отозванными токенами на сервере

// 1. Удаление токена на клиенте
// Один из наиболее простых способов завершения сеанса - удаление JWT из хранилища клиента (например, LocalStorage или Cookies).
// Пример удаления токена из LocalStorage на фронтенде:
const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Перенаправление на страницу входа
  };
  
  // Пример удаления токена из Cookies:
  const logout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    window.location.href = '/login'; // Перенаправление на страницу входа
  };
  
  // 2. Управление отозванными токенами на сервере
  // В некоторых случаях, чтобы обеспечить большую безопасность, необходимо управлять списком отозванных токенов.
  // Это позволяет серверу отклонять токены, которые были отозваны, даже если они еще не истекли.
  
  // Пример реализации списка отозванных токенов:
  
  // 2.1. Хранение отозванных токенов
  // Один из подходов - хранить отозванные токены в базе данных или в памяти.
  // Для примера, мы будем использовать массив в памяти (для простоты):
  const revokedTokens = [];
  
  // Функция для добавления токена в список отозванных:
  const revokeToken = (token) => {
    revokedTokens.push(token);
  };
  
  // Функция для проверки, отозван ли токен:
  const isTokenRevoked = (token) => {
    return revokedTokens.includes(token);
  };
  
  // 2.2. Обработка запросов с отозванными токенами
  // При обработке защищенных маршрутов на сервере необходимо проверять, отозван ли токен.
  const express = require('express');
  const app = express();
  const jwt = require('jsonwebtoken');
  const secretKey = 'your-secret-key';
  
  // Middleware для проверки токенов:
  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401);
  
    if (isTokenRevoked(token)) return res.sendStatus(403); // Отказ в доступе, если токен отозван
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };
  
  // Маршрут для выхода и отзыва токена:
  app.post('/logout', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token) {
      revokeToken(token);
    }
  
    res.sendStatus(200);
  });
  
  // Пример защищенного маршрута:
  app.get('/protected', authenticateToken, (req, res) => {
    res.send('This is a protected route');
  });
  
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  
  // Итог:
  // Завершение сеанса пользователя с использованием JWT может быть выполнено удалением токена на клиенте и управлением отозванными токенами на сервере.
  // Управление отозванными токенами повышает безопасность, обеспечивая, что отозванные токены не могут быть использованы для доступа к защищенным ресурсам.
  