// Глава 9: Практическое применение JWT
// Подглава 9.3: Часто встречающиеся проблемы и их решения
// Типичные ошибки при работе с JWT и способы их устранения

// JSON Web Tokens (JWT) являются популярным способом аутентификации и авторизации в веб-приложениях.
// Однако при работе с JWT могут возникать различные проблемы. В этой подглаве мы рассмотрим наиболее типичные ошибки и способы их устранения.

// 1. Неверное использование секретного ключа
// Проблема: При создании и верификации JWT может быть использован неправильный секретный ключ, что приводит к ошибке проверки подписи.
// Решение: Убедитесь, что секретный ключ используется одинаково как для создания, так и для верификации токена.
// Пример создания JWT с использованием секретного ключа:
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

const token = jwt.sign({ userId: 1 }, secretKey, { expiresIn: '1h' });

// Пример верификации JWT с использованием того же секретного ключа:
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('Token verification failed:', err);
  } else {
    console.log('Token is valid:', decoded);
  }
});

// 2. Проблемы с временем жизни токена (expiration)
// Проблема: Токены могут истечь слишком рано или слишком поздно, что приведет к проблемам с доступом.
// Решение: Установите разумное время жизни токена и реализуйте механизм обновления токенов.
// Пример установки времени жизни токена:
const token = jwt.sign({ userId: 1 }, secretKey, { expiresIn: '1h' });

// 3. Необходимость хранения токенов
// Проблема: Некорректное хранение токенов на клиентской стороне может привести к проблемам с безопасностью.
// Решение: Храните токены в безопасном месте, например, в HTTP-Only cookies, чтобы предотвратить доступ к ним из JavaScript.
// Пример установки токена в HTTP-Only cookie:
app.use((req, res, next) => {
  res.cookie('token', token, { httpOnly: true });
  next();
});

// 4. Проблемы с декодированием и обработкой токенов
// Проблема: Некорректное декодирование токенов может привести к ошибкам в авторизации.
// Решение: Убедитесь, что токены декодируются и обрабатываются правильно.
// Пример декодирования JWT:
const decoded = jwt.decode(token);
console.log('Decoded token:', decoded);

// 5. Отсутствие проверки JWT на сервере
// Проблема: Если сервер не проверяет JWT, может быть предоставлен доступ к защищенным ресурсам без авторизации.
// Решение: Добавьте промежуточное ПО (middleware) для проверки JWT на сервере.
// Пример промежуточного ПО для проверки JWT с использованием Express.js:
const express = require('express');
const app = express();

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.use(authenticateToken);

// 6. Уязвимости при передаче токенов
// Проблема: Токены могут быть перехвачены при передаче по незащищенному каналу.
// Решение: Используйте HTTPS для обеспечения безопасности передачи данных.
// Пример настройки HTTPS для Express.js:
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('path/to/private.key'),
  cert: fs.readFileSync('path/to/certificate.crt')
};

https.createServer(options, app).listen(3000, () => {
  console.log('Server is running on https://localhost:3000');
});

// Итог:
// При работе с JWT могут возникать различные проблемы, включая неправильное использование секретного ключа, проблемы с временем жизни токена, безопасность хранения токенов, ошибки в декодировании, отсутствие проверки на сервере и уязвимости при передаче данных.
// Понимание и решение этих проблем поможет создать более безопасное и надежное приложение.
