// Глава 3: Генерация и использование JWT
// Подглава 3.2: Управление сроком действия JWT

// JSON Web Tokens (JWT) часто используются для аутентификации и авторизации в веб-приложениях.
// В этой подглаве мы рассмотрим, как управлять сроком действия JWT, настраивать дату начала действия, а также обновлять и продлевать токены.

// 1. Настройка срока действия (exp) и даты начала действия (nbf)

// При генерации JWT можно задать срок его действия с помощью параметра `exp` (expiration time) и дату начала действия с помощью параметра `nbf` (not before).
// Параметр `exp` указывает, когда токен истечет, а `nbf` указывает, когда токен начнет действовать.

// Пример генерации JWT с использованием библиотеки `jsonwebtoken`:

const jwt = require('jsonwebtoken');

// Секретный ключ для подписи токенов
const secretKey = 'your-secret-key';

// Настройки токена
const payload = {
  userId: 1,
  role: 'user'
};

// Устанавливаем срок действия токена на 1 час и дату начала действия через 10 секунд
const options = {
  expiresIn: '1h', // срок действия токена
  notBefore: '10s' // дата начала действия токена
};

// Генерация JWT
const token = jwt.sign(payload, secretKey, options);
console.log('Generated Token:', token);

// 2. Работа с JWT по истечении срока действия

// При проверке токена важно учитывать его срок действия. Если токен истек, он должен быть отклонен.
// Пример проверки токена и обработки ошибки истечения срока действия:

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log('Token is valid:', decoded);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('Token has expired:', error.message);
    } else {
      console.error('Token is invalid:', error.message);
    }
    return null;
  }
};

// Проверка истекшего токена
const expiredToken = 'your-expired-token-here';
verifyToken(expiredToken);

// 3. Обновление и продление JWT

// Для продления срока действия JWT можно создать новый токен с обновленным временем истечения.
// Обычно это делается в ответ на запросы от клиента, когда токен истек или подходит к концу своего срока действия.

// Пример обновления токена:

const renewToken = (oldToken) => {
  try {
    const decoded = jwt.verify(oldToken, secretKey, { ignoreExpiration: true });
    // Генерация нового токена с обновленным сроком действия
    const newToken = jwt.sign({ userId: decoded.userId, role: decoded.role }, secretKey, { expiresIn: '1h' });
    console.log('Renewed Token:', newToken);
    return newToken;
  } catch (error) {
    console.error('Error renewing token:', error.message);
    return null;
  }
};

// Обновление истекшего токена
const tokenToRenew = 'your-token-to-renew-here';
renewToken(tokenToRenew);

// Итог:
// Управление сроком действия JWT включает настройку параметров `exp` и `nbf`, обработку истекших токенов и обновление токенов по мере необходимости.
// Эти шаги помогают обеспечить безопасность и актуальность токенов в вашем приложении.
