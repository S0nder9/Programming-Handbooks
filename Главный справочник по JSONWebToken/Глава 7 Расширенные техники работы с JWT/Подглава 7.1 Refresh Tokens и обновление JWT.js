// Глава 7: Расширенные техники работы с JWT
// Подглава 7.1: Refresh Tokens и обновление JWT

// В этой подглаве мы рассмотрим использование Refresh Tokens для обновления JWT без необходимости повторной аутентификации,
// а также реализуем механизм обновления токенов на сервере с использованием Node.js.

// Что такое Refresh Token?
// Refresh Token используется для получения нового Access Token (JWT), когда старый токен истек.
// Это позволяет пользователю оставаться аутентифицированным без необходимости повторного входа в систему.

// Как работают Refresh Tokens:
// 1. Пользователь аутентифицируется и получает Access Token и Refresh Token.
// 2. Access Token используется для доступа к защищенным ресурсам и имеет короткий срок жизни (например, 15 минут).
// 3. Когда Access Token истекает, фронтенд отправляет Refresh Token на сервер для получения нового Access Token.
// 4. Сервер проверяет Refresh Token и, если он действителен, выдает новый Access Token и, при необходимости, новый Refresh Token.

// Реализация механизма обновления токенов:

// 1. Создание Refresh Token при аутентификации:
// При успешной аутентификации вы создаете и отправляете как Access Token, так и Refresh Token.
// Пример создания токенов:
const jwt = require('jsonwebtoken');

// Создание Access Token и Refresh Token
const generateTokens = (user) => {
  const accessToken = jwt.sign({ userId: user.id }, 'access-secret-key', { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId: user.id }, 'refresh-secret-key', { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

// Пример обработки логина
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Проверка учетных данных пользователя...
  const user = { id: 1, username: 'john' }; // Заглушка для примера
  const { accessToken, refreshToken } = generateTokens(user);
  res.json({ accessToken, refreshToken });
});

// 2. Обновление Access Token с помощью Refresh Token:
// Клиент отправляет Refresh Token на сервер для получения нового Access Token.
// Пример обработки запроса на обновление токенов:
app.post('/api/refresh-token', (req, res) => {
  const { refreshToken } = req.body;
  
  jwt.verify(refreshToken, 'refresh-secret-key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Refresh Token' });
    }
    
    // Генерация нового Access Token
    const { accessToken } = generateTokens({ id: decoded.userId });
    res.json({ accessToken });
  });
});

// 3. Обработка обновления токенов на фронтенде:
// Фронтенд отправляет Refresh Token на сервер для получения нового Access Token.
// Пример использования Fetch API для обновления токенов:
const refreshToken = 'existing-refresh-token'; // Пример Refresh Token
fetch('/api/refresh-token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refreshToken })
})
  .then(response => response.json())
  .then(data => {
    const { accessToken } = data;
    // Сохранение нового Access Token и обновление пользовательского интерфейса
    console.log('New Access Token:', accessToken);
  })
  .catch(error => console.error('Error:', error));

// Итог:
// Использование Refresh Tokens позволяет обновлять Access Token без необходимости повторной аутентификации пользователя.
// Это улучшает пользовательский опыт и безопасность приложения.
// Реализация механизма обновления токенов включает создание токенов при аутентификации и их обновление при истечении срока действия.
