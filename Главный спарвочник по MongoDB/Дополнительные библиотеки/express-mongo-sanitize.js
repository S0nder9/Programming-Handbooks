// Глава 1: Полезные библиотеки - express-mongo-sanitize

// express-mongo-sanitize - это библиотека для Node.js, предназначенная для защиты ваших приложений Express от атак на основе внедрения, таких как 
// MongoDB NoSQL инъекции. Она очищает входящие данные и гарантирует, что они не содержат небезопасных символов,
// таких как точки и доллары, которые могут быть использованы для манипуляции с запросами к базе данных MongoDB.

// Установка:
// Чтобы установить express-mongo-sanitize, используйте npm или yarn:
npm install express-mongo-sanitize

// Пример использования express-mongo-sanitize в Express-приложении:

const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

// Подключаем middleware для очистки данных
app.use(mongoSanitize());

// Пример маршрута, который получает данные от клиента
app.post('/api/users', (req, res) => {
  const userData = req.body;

  // Теперь userData очищен от небезопасных символов
  console.log('Sanitized data:', userData);

  // Здесь вы можете продолжить обработку userData, например, сохранить его в базе данных
  res.status(201).send('User data received and sanitized');
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Как это работает:
// express-mongo-sanitize удаляет специальные символы, такие как:
// - точки (.) – которые могут использоваться для доступа к поддокументам
// - доллары ($) – которые могут использоваться в операциях MongoDB
// Это помогает предотвратить атаки, в которых злоумышленник может попытаться
// использовать эти символы для манипуляции запросами к базе данных.

// Пример передаваемых данных:
// Если клиент отправляет запрос с данными:
// {
//   username: 'user',
//   password: 'password',
//   $where: 'some malicious code'
// }
// express-mongo-sanitize очистит их и преобразует в:
// {
//   username: 'user',
//   password: 'password'
// }

// Итог:
// express-mongo-sanitize – это полезная библиотека для защиты вашего приложения от NoSQL-инъекций.
// Использование этой библиотеки поможет вам поддерживать безопасность и целостность ваших данных,
// а также защитить ваше приложение от потенциальных угроз.
