// Глава 5: Безопасность JWT

// Подглава 5.1: Защита JWT от атак

// JWT (JSON Web Tokens) используются для аутентификации и авторизации в веб-приложениях.
// Однако JWT подвержены различным типам атак, и важно применять меры для их защиты.

// Атаки на JWT и способы защиты:

// 1. Подмена токена
// Подмена токена происходит, когда злоумышленник подделывает или изменяет JWT, чтобы получить несанкционированный доступ.
// Защита от подмены токена:
// - Используйте секретный ключ для подписывания токенов. Убедитесь, что ключ достаточно сложный и надежный.
// - Используйте алгоритмы HMAC (например, HS256) или RSA (например, RS256) для создания цифровой подписи токена.
// - Проверяйте подпись токена на сервере перед выполнением любых действий, связанных с авторизацией.

// Пример проверки подписи токена на сервере с использованием библиотеки jsonwebtoken:
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

// 2. Атаки с повтором (Replay attacks)
// Атаки с повтором происходят, когда злоумышленник повторно использует валидный токен для несанкционированного доступа.
// Защита от атак с повтором:
// - Используйте короткий срок действия токенов и обновляйте их периодически.
// - Используйте механизмы для аннулирования токенов, такие как черные списки или базы данных токенов.

// Пример реализации короткого срока действия токена:
const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '15m' });
};

// 3. Перехват токена
// Перехват токена происходит, когда злоумышленник получает токен через незашифрованное соединение.
// Защита от перехвата токена:
// - Используйте HTTPS для защиты данных при передаче. HTTPS шифрует трафик между клиентом и сервером, предотвращая перехват токенов.

// Пример использования HTTPS:
// Убедитесь, что ваш сервер работает через HTTPS. Для этого необходимо настроить SSL-сертификат.
// При использовании Express.js можно использовать библиотеку helmet для улучшения безопасности:
const helmet = require('helmet');
const express = require('express');
const app = express();

app.use(helmet());

// HTTPS конфигурация (необходим SSL-сертификат):
const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync('path/to/your/private.key'),
  cert: fs.readFileSync('path/to/your/certificate.crt'),
};

https.createServer(options, app).listen(443, () => {
  console.log('Server is running on HTTPS');
});

// Итог:
// JWT подвержены различным атакам, включая подмену токена, атаки с повтором и перехват токенов.
// Применение правильных мер защиты, таких как использование надежного секретного ключа, короткий срок действия токенов и HTTPS, поможет защитить ваше приложение от этих угроз.
