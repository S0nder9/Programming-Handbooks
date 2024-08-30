// Глава 9: Практическое применение JWT
// Подглава 9.2: Best Practices для работы с JWT

// JSON Web Tokens (JWT) используются для передачи информации между участниками системы в виде токенов.
// Они позволяют аутентифицировать и авторизовать пользователей, а также передавать данные между фронтендом и бекендом.
// В этой подглаве мы рассмотрим рекомендации и советы по безопасному и эффективному использованию JWT в реальных проектах.

// Рекомендации и советы по использованию JWT:

// 1. Используйте безопасные алгоритмы подписи
// JWT поддерживает несколько алгоритмов подписи. Рекомендуется использовать алгоритмы с симметричным шифрованием, такие как HMAC SHA-256 (HS256), или ассиметричные алгоритмы, такие как RSA (RS256).
// Пример использования HS256 в Node.js:
const jwt = require('jsonwebtoken');
const token = jwt.sign({ userId: 1 }, 'your-secret-key', { algorithm: 'HS256' });

// 2. Защищайте секретные ключи
// Секретные ключи, используемые для подписи и проверки JWT, должны храниться в безопасном месте и не быть опубликованы в исходном коде.
// Используйте переменные окружения для хранения секретных ключей:
// Пример использования переменных окружения:
const secretKey = process.env.JWT_SECRET;
const token = jwt.sign({ userId: 1 }, secretKey, { algorithm: 'HS256' });

// 3. Устанавливайте срок годности токенов
// JWT токены должны иметь ограниченный срок действия, чтобы уменьшить риск их компрометации.
// Настройте срок годности с помощью параметра `expiresIn`:
// Пример установки срока годности:
const token = jwt.sign({ userId: 1 }, secretKey, { expiresIn: '1h' });

// 4. Обрабатывайте обновление токенов
// Используйте механизмы обновления токенов (refresh tokens) для обеспечения долгосрочной аутентификации.
// Обновляйте основной токен с помощью refresh токенов, которые имеют более длительный срок действия и могут быть использованы для получения нового JWT.
// Пример обработки обновления токенов:
app.post('/api/refresh-token', (req, res) => {
  const { refreshToken } = req.body;
  // Проверка и обновление токена...
  const newToken = jwt.sign({ userId: 1 }, secretKey, { expiresIn: '1h' });
  res.json({ token: newToken });
});

// 5. Используйте HTTPS
// Обеспечьте использование HTTPS для защиты данных, передаваемых через JWT. Это предотвращает возможность перехвата токенов злоумышленниками.
// Пример настройки HTTPS в Express.js:
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('path/to/private-key.pem'),
  cert: fs.readFileSync('path/to/certificate.pem'),
};

https.createServer(options, app).listen(443, () => {
  console.log('Server is running on port 443');
});

// 6. Избегайте хранения JWT в localStorage
// Избегайте хранения JWT в localStorage из-за уязвимости к XSS-атакам. Используйте HTTP-only cookies для хранения токенов.
// Пример установки токена в HTTP-only cookie:
app.post('/api/login', (req, res) => {
  const token = jwt.sign({ userId: 1 }, secretKey, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.json({ message: 'Login successful' });
});

// 7. Проверяйте токены на стороне сервера
// На сервере проверяйте подлинность и целостность JWT перед тем, как использовать данные из токена.
// Пример проверки токена:
app.get('/api/protected', (req, res) => {
  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, secretKey);
    res.json({ message: 'Protected data', userId: decoded.userId });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Итог:
// Следование best practices для работы с JWT поможет обеспечить безопасность и эффективность аутентификации и авторизации в вашем приложении.
// Используйте безопасные алгоритмы, защищайте секретные ключи, устанавливайте срок годности токенов и всегда проверяйте токены на стороне сервера.
