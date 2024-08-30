// Глава 8: Отладка и тестирование JWT
// Подглава 8.2: Тестирование безопасности JWT

// Тестирование устойчивости JWT к атакам
// JSON Web Tokens (JWT) широко используются для аутентификации и авторизации в веб-приложениях.
// Однако, как и любой другой механизм безопасности, JWT подвержены различным атакам.
// В этой подглаве мы рассмотрим способы тестирования безопасности JWT, включая симуляцию различных сценариев использования.

const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(express.json());

// Секретный ключ для подписи JWT
const secretKey = 'your-secret-key';

// Пример маршрута для генерации JWT
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // В реальном приложении тут должна быть проверка учетных данных
  const token = jwt.sign({ userId: 1 }, secretKey, { expiresIn: '1h' });
  res.json({ token });
});

// Пример защищенного маршрута, требующего JWT
app.get('/api/protected', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    res.json({ message: 'Protected content', user });
  });
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Тестирование устойчивости JWT к атакам
// 1. **Атака повторного использования (Replay Attack)**
// Попробуйте использовать действующий JWT после его истечения или попытайтесь повторно использовать токен, выданный ранее.
// В реальном приложении обеспечьте защиту от повторного использования путем проверки таймстампов и добавления уникальных идентификаторов.

const testReplayAttack = async () => {
  // Получаем JWT
  let response = await fetch('http://localhost:3000/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: 'user', password: 'password' }) });
  let data = await response.json();
  const token = data.token;

  // Пытаемся получить доступ к защищенному ресурсу с использованием токена
  response = await fetch('http://localhost:3000/api/protected', { headers: { 'Authorization': `Bearer ${token}` } });
  console.log(await response.json());
};

testReplayAttack();

// 2. **Атака с подделкой токена (Token Forgery)**
// Попробуйте создать собственный JWT с использованием некорректного или поддельного ключа.
// В реальном приложении убедитесь, что токены подписаны и проверены с использованием надежного секретного ключа.

const testTokenForgery = async () => {
  // Создаем поддельный токен
  const fakeToken = jwt.sign({ userId: 1 }, 'fake-secret-key', { expiresIn: '1h' });

  // Пытаемся получить доступ к защищенному ресурсу с использованием поддельного токена
  let response = await fetch('http://localhost:3000/api/protected', { headers: { 'Authorization': `Bearer ${fakeToken}` } });
  console.log(await response.json());
};

testTokenForgery();

// 3. **Атака с использованием истекшего токена (Expired Token Attack)**
// Попробуйте использовать истекший JWT для доступа к защищенным ресурсам.
// Убедитесь, что ваше приложение корректно обрабатывает истекшие токены.

const testExpiredToken = async () => {
  // Создаем истекший токен
  const expiredToken = jwt.sign({ userId: 1 }, secretKey, { expiresIn: '-1s' });

  // Пытаемся получить доступ к защищенному ресурсу с использованием истекшего токена
  let response = await fetch('http://localhost:3000/api/protected', { headers: { 'Authorization': `Bearer ${expiredToken}` } });
  console.log(await response.json());
};

testExpiredToken();

// Итог:
// Тестирование безопасности JWT включает проверку устойчивости к атакам, таким как повторное использование токенов, подделка токенов и использование истекших токенов.
// Используйте эти сценарии для обеспечения надежности и безопасности JWT в вашем приложении.
