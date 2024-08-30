// Глава 7: Расширенные техники работы с JWT

// Подглава 7.2: JWT и OAuth 2.0

// Использование JWT в контексте OAuth 2.0
// OAuth 2.0 - это протокол авторизации, который позволяет приложениям получить доступ к ресурсам пользователя на других сервисах.
// JWT (JSON Web Tokens) часто используется в контексте OAuth 2.0 для передачи информации об аутентификации и авторизации.
// JWT предоставляет компактный, безопасный и самодостаточный способ обмена данными между клиентом и сервером.


// JWT как Access Token и ID Token в OAuth 2.0
// В контексте OAuth 2.0 JWT может быть использован как Access Token или ID Token.

// 1. Access Token
// Access Token - это токен, который используется для авторизации запросов к защищенным ресурсам на сервере.
// При получении Access Token клиент может использовать его для доступа к ресурсам от имени пользователя.
// JWT часто используется в качестве Access Token из-за своей компактности и возможности хранения информации о пользователе и его разрешениях.

// Пример создания JWT в качестве Access Token:
const jwt = require('jsonwebtoken');

const accessToken = jwt.sign(
  { userId: 1, roles: ['user', 'admin'] },
  'your-secret-key',
  { expiresIn: '1h' }
);

// Пример проверки Access Token на сервере:
app.get('/api/protected', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).send('Access Token required');

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) return res.status(403).send('Invalid Access Token');
    req.user = decoded;
    res.send('Protected data');
  });
});

// 2. ID Token
// ID Token - это токен, который содержит информацию о пользователе и его аутентификации.
// ID Token используется в OpenID Connect (OIDC), который строится на основе OAuth 2.0 и предоставляет данные о пользователе.
// ID Token также может быть реализован как JWT, что позволяет передавать информацию о пользователе в компактном формате.

// Пример создания JWT в качестве ID Token:
const idToken = jwt.sign(
  { sub: 'user123', name: 'John Doe', email: 'john@example.com' },
  'your-secret-key',
  { expiresIn: '1h' }
);

// Пример проверки ID Token на сервере:
app.get('/api/userinfo', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).send('ID Token required');

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) return res.status(403).send('Invalid ID Token');
    res.json({
      userId: decoded.sub,
      name: decoded.name,
      email: decoded.email
    });
  });
});

// Итог:
// JWT предоставляет удобный способ работы с Access Token и ID Token в контексте OAuth 2.0.
// Использование JWT позволяет компактно и безопасно передавать информацию о пользователе и его разрешениях, что упрощает работу с аутентификацией и авторизацией в веб-приложениях.
