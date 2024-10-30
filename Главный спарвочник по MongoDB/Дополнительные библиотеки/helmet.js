// Глава 1: Полезные библиотеки - Helmet

// Helmet - это библиотека Node.js, предназначенная для улучшения безопасности HTTP-заголовков вашего приложения Express.js.
// Она помогает защитить ваше приложение от различных веб-уязвимостей, таких как XSS, кликджекинг, и атаки типа "sniffing".
// Helmet автоматически добавляет заголовки безопасности, позволяя фокусироваться на других аспектах разработки, не жертвуя защитой.

// Установка Helmet
// Для установки библиотеки введите следующую команду в терминале:
npm install helmet

// Основное использование Helmet
// Helmet добавляет безопасные заголовки HTTP ко всем ответам вашего сервера. Настройки по умолчанию защищают ваше приложение
// от большинства распространенных угроз, но при необходимости их можно настроить.

// Пример использования Helmet в приложении на Express.js
const express = require('express');
const helmet = require('helmet');

const app = express();

// Включаем Helmet для всего приложения
app.use(helmet());

// Теперь все заголовки безопасности добавлены к ответам сервера.
// Вы можете проверить заголовки безопасности с помощью DevTools в браузере или специальными тестовыми инструментами, такими как curl или Postman.

app.get('/', (req, res) => {
  res.send('Hello, secure world!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Основные модули Helmet
// Helmet включает множество встроенных функций для улучшения безопасности. Рассмотрим некоторые из них:

// 1. helmet.contentSecurityPolicy()
// Этот модуль позволяет вам контролировать, какие источники контента могут быть загружены вашим приложением,
// предотвращая атаки XSS. По умолчанию Content Security Policy (CSP) блокирует потенциально опасные скрипты.
// Пример настройки CSP:
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'example.com'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

// 2. helmet.xssFilter()
// Включает XSS-защиту в браузерах, которые поддерживают этот заголовок.
// Это помогает предотвращать XSS-атаки, где злоумышленники пытаются внедрить вредоносный код.
app.use(helmet.xssFilter());

// 3. helmet.frameguard()
// Помогает защитить ваше приложение от кликджекинга, запрещая встраивание страниц в <iframe>.
// Пример: установка на режим "deny", чтобы вообще запретить встраивание.
app.use(helmet.frameguard({ action: 'deny' }));

// 4. helmet.noSniff()
// Отключает "sniffing" MIME-типа, заставляя браузеры использовать указанный MIME-тип и не догадываться о содержимом файла.
// Это предотвращает атаки, где вредоносный файл может быть распознан как другой тип контента.
app.use(helmet.noSniff());

// 5. helmet.hidePoweredBy()
// Убирает заголовок "X-Powered-By", который по умолчанию указывает, что приложение работает на Express.
// Это небольшая мера, которая затрудняет для злоумышленников идентификацию вашего фреймворка.
app.use(helmet.hidePoweredBy());

// 6. helmet.hsts()
// Устанавливает заголовок HTTP Strict Transport Security (HSTS), требуя, чтобы браузер взаимодействовал с сайтом только через HTTPS.
// Это помогает предотвратить атаки типа "man-in-the-middle" на ваших пользователей.
app.use(
  helmet.hsts({
    maxAge: 31536000, // Продолжительность действия заголовка HSTS в секундах (например, один год)
    includeSubDomains: true, // Распространяется на все поддомены
    preload: true, // Включение сайта в списки HSTS браузеров для предварительной загрузки
  })
);

// Итог:
// Helmet - это мощная библиотека для улучшения безопасности приложения Express.js путем добавления полезных HTTP-заголовков.
// Она упрощает защиту от наиболее распространенных веб-угроз и помогает минимизировать потенциальные риски.
