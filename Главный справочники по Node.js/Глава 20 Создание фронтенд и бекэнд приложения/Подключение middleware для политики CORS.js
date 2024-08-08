// Глава 20: Создание фронтенд и бекэнд приложения - Подключение middleware для политики CORS в Node.js

// CORS (Cross-Origin Resource Sharing) — это механизм безопасности, который позволяет контролировать, какие домены могут делать запросы к вашему серверу.
// В Node.js с использованием Express, настройка политики CORS осуществляется через middleware, что позволяет вам управлять доступом из других доменов.

// Как работает CORS:
// Когда браузер выполняет запросы к серверу с другого домена (или порта), он отправляет предварительный запрос (preflight request) с методом OPTIONS.
// Сервер должен ответить на этот запрос с заголовками, указывающими, разрешены ли такие запросы.
// Middleware CORS в Express упрощает настройку этих заголовков.

// Установка middleware для CORS:
// Для работы с CORS в Express обычно используется пакет `cors`. Установите его с помощью npm:
const express = require('express');
const cors = require('cors');
const app = express();

// Подключение middleware CORS:
app.use(cors());

// Пример настройки CORS для разрешения запросов только с определенного домена:
const corsOptions = {
  origin: 'https://example.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

// Пример настройки CORS для разрешения запросов с нескольких доменов:
const allowedOrigins = ['https://example.com', 'https://anotherdomain.com'];
const corsOptionsDelegate = (req, callback) => {
  const corsOptions = { origin: false };
  if (allowedOrigins.includes(req.header('Origin'))) {
    corsOptions.origin = true; // Включить CORS для указанного домена
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

// Пример использования CORS с REST API:
// Настройка маршрута для GET-запроса:
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Запуск сервера:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Итог:
// Подключение middleware CORS в Express позволяет контролировать, какие домены могут делать запросы к вашему серверу.
// Это важный шаг для обеспечения безопасности вашего приложения и управления доступом к вашему API.
