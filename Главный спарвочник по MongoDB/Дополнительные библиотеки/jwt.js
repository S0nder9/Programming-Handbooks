// Глава 1: Дополнительные библиотеки - JWT
// JWT (JSON Web Token) является одним из наиболее популярных способов аутентификации и авторизации в современных веб-приложениях.
// JWT позволяет передавать зашифрованные данные в компактном формате между клиентом и сервером.

// Основные моменты использования JWT:
// - JWT состоит из трех частей: Header (заголовок), Payload (полезная нагрузка), Signature (подпись).
// - Заголовок содержит информацию о типе токена и алгоритме шифрования.
// - Полезная нагрузка содержит основные данные (например, идентификатор пользователя, срок действия токена).
// - Подпись используется для проверки подлинности токена и защиты от подделки.

// Установка библиотеки jsonwebtoken:
// Чтобы использовать JWT в Node.js, необходимо установить библиотеку jsonwebtoken.
// ```bash
// npm install jsonwebtoken
// ```

// 1. Создание JWT
// Пример создания токена JWT с использованием библиотеки jsonwebtoken.
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Секретный ключ для подписи токена

// Данные для токена
const payload = {
  userId: 123,
  username: 'john_doe',
  role: 'admin'
};

// Генерация токена
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
console.log('Generated JWT:', token);

// В этом примере токен создается с полезной нагрузкой, секретным ключом и временем истечения (1 час).

// 2. Расшифровка и проверка JWT
// Чтобы проверить токен и получить его полезную нагрузку, используется метод jwt.verify.
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('Invalid token:', err);
  } else {
    console.log('Decoded payload:', decoded);
  }
});

// Если токен действителен, метод вернет полезную нагрузку. В противном случае будет выведена ошибка.

// 3. Декодирование токена без проверки подписи
// Иногда нужно только декодировать токен без проверки его подписи. Для этого используется метод jwt.decode.
const decoded = jwt.decode(token);
console.log('Decoded token:', decoded);

// Обратите внимание, что jwt.decode не проверяет подлинность токена, он только декодирует его данные.

// 4. Добавление дополнительных данных в полезную нагрузку
// Полезная нагрузка может включать дополнительные данные, такие как роль пользователя или права доступа, для расширенной авторизации.
const payloadWithRoles = {
  userId: 456,
  username: 'jane_doe',
  role: 'user',
  permissions: ['read', 'write']
};

const tokenWithRoles = jwt.sign(payloadWithRoles, secretKey, { expiresIn: '2h' });
console.log('Generated JWT with roles:', tokenWithRoles);

// В этом примере токен содержит дополнительную информацию о правах пользователя.

// 5. Обновление и инвалидация токенов
// Для безопасности токены могут регулярно обновляться. Также можно реализовать инвалидацию токенов, например, сохраняя их в базе данных и проверяя при каждом запросе.
// Обновление токена может быть выполнено, создав новый токен с теми же данными, но новым временем истечения.

const refreshToken = (oldPayload) => {
  return jwt.sign(oldPayload, secretKey, { expiresIn: '1h' });
};

const refreshedToken = refreshToken(payload);
console.log('Refreshed JWT:', refreshedToken);

// 6. Использование JWT с промежуточным ПО (middleware)
// JWT часто используется в промежуточном ПО Express для проверки подлинности пользователя перед доступом к защищенным маршрутам.

const express = require('express');
const app = express();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Пример защищенного маршрута, доступного только для авторизованных пользователей
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// 7. Безопасность при использовании JWT
// При работе с JWT необходимо учитывать несколько факторов безопасности:
// - Секретный ключ должен быть достаточно сложным и защищенным.
// - Используйте HTTPS для безопасной передачи токенов.
// - Храните токен в безопасном месте (например, в HTTP-Only cookies или в защищенном хранилище).

// 8. Обновление токенов с использованием Refresh Tokens
// Refresh Tokens используются для обновления Access Tokens, не требуя повторной авторизации пользователя.
// Refresh Tokens имеют более длительный срок жизни и передаются клиенту вместе с Access Tokens.

const refreshTokens = []; // Массив для хранения выданных Refresh Tokens

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = jwt.sign({ userId: user.userId }, secretKey, { expiresIn: '15m' });
    res.json({ accessToken: newAccessToken });
  });
});

// Итог:
// JWT предоставляет гибкий и безопасный способ аутентификации и авторизации.
// Используя библиотеку jsonwebtoken, можно легко создавать, верифицировать и обновлять токены в приложении на Node.js.
// При этом важно следить за безопасностью токенов и учитывать лучшие практики работы с ними.
