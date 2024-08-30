// Глава 3: Генерация и использование JWT

// Подглава 3.1: Создание JWT

// JSON Web Token (JWT) является стандартом для безопасной передачи информации между участниками.
// JWT обычно используется для аутентификации и авторизации пользователей.
// В этой подглаве мы рассмотрим, как генерировать JWT с использованием библиотек на различных языках программирования,
// а также как настроить параметры, такие как срок действия и алгоритм подписи.

// Генерация JWT с использованием библиотек на различных языках программирования:

// 1. JavaScript (Node.js)

// Для генерации JWT в Node.js можно использовать библиотеку `jsonwebtoken`.
// Установите библиотеку с помощью npm:
// npm install jsonwebtoken

const jwt = require('jsonwebtoken');

// Пример генерации JWT:
const secretKey = 'your-secret-key';
const payload = { userId: 123 };

// Создание токена с указанием срока действия и алгоритма подписи
const token = jwt.sign(payload, secretKey, { expiresIn: '1h', algorithm: 'HS256' });

console.log('Generated JWT:', token);

// 2. Python

// Для генерации JWT в Python можно использовать библиотеку `pyjwt`.
// Установите библиотеку с помощью pip:
// pip install pyjwt

// import jwt
// import datetime

// # Пример генерации JWT:
// secret_key = 'your-secret-key'
// payload = { 'userId': 123 }

// # Создание токена с указанием срока действия и алгоритма подписи
// token = jwt.encode(payload, secret_key, algorithm='HS256', expires_delta=datetime.timedelta(hours=1))

// print('Generated JWT:', token.decode('utf-8'))

// 3. Java

// Для генерации JWT в Java можно использовать библиотеку `jjwt`.
// Добавьте зависимость в ваш проект Maven:
// <dependency>
//   <groupId>io.jsonwebtoken</groupId>
//   <artifactId>jjwt</artifactId>
//   <version>0.9.1</version>
// </dependency>

// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;

// public class JwtExample {
//     public static void main(String[] args) {
//         String secretKey = "your-secret-key";
//         String payload = "userId=123";

//         // Создание токена с указанием срока действия и алгоритма подписи
//         String token = Jwts.builder()
//             .setSubject(payload)
//             .signWith(SignatureAlgorithm.HS256, secretKey)
//             .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // Срок действия - 1 час
//             .compact();

//         System.out.println("Generated JWT: " + token);
//     }
// }

// Настройка и настройка параметров JWT:

// 1. Срок действия (Expiration Time)
// Срок действия токена задается параметром `expiresIn` (в JavaScript) или `expires_delta` (в Python).
// Это значение указывает, сколько времени токен будет действителен.
// После истечения срока действия токен станет недействительным и потребует повторной аутентификации.

const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
// в Python: expires_delta=datetime.timedelta(hours=1)

// 2. Алгоритм подписи (Signature Algorithm)
// Алгоритм подписи определяет, каким способом будет подписан токен.
// Наиболее часто используемые алгоритмы - HS256 (HMAC SHA-256) и RS256 (RSA SHA-256).
// Вы можете настроить алгоритм подписи при создании токена и должны использовать тот же алгоритм для проверки токена.

const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });
// в Python: algorithm='HS256'

// Итог:
// Генерация JWT может быть выполнена с помощью различных библиотек на разных языках программирования.
// Настройка параметров, таких как срок действия и алгоритм подписи, позволяет создать безопасные и надежные токены для аутентификации и авторизации.
