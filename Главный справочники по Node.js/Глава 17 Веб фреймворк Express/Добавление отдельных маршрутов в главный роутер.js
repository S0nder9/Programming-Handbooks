// Глава 17: Веб фреймворк Express - Добавление отдельных маршрутов в главный роутер в Node.js

// В Express, популярном веб-фреймворке для Node.js, маршрутизация является одной из ключевых концепций.
// Она позволяет определить, как приложение должно реагировать на различные запросы клиентов по различным URL.

// Как работают маршруты в Express:
// Маршруты определяются с использованием методов объекта app (например, app.get, app.post) или объекта Router.
// Эти методы определяют, как приложение должно реагировать на определенный HTTP-запрос по указанному пути.

// Пример простого маршрута:
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Добавление отдельных маршрутов в главный роутер:
// Для лучшей организации кода можно использовать объект Router для определения маршрутов в отдельных модулях и добавления их в главный роутер.

// Создание модуля с маршрутом:
const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  res.send('List of users');
});

router.post('/users', (req, res) => {
  res.send('Add a user');
});

module.exports = router;

// В главном файле приложения подключаем маршруты:
const express = require('express');
const app = express();
const userRoutes = require('./routes/users');

app.use('/api', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// В этом примере:
// 1. Мы создали отдельный модуль для маршрутов /users, который экспортирует объект router.
// 2. В главном файле приложения мы импортируем этот модуль и используем его с префиксом /api, что означает, что все маршруты, определенные в userRoutes, будут доступны по URL, начинающемуся с /api.

// Пример добавления нескольких маршрутов:
const express = require('express');
const app = express();

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Модуль маршрутов для продуктов (routes/products.js):
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('List of products');
});

router.post('/', (req, res) => {
  res.send('Add a product');
});

module.exports = router;

// Итог:
// Использование объекта Router позволяет лучше организовать маршруты и упростить поддержку кода.
// Маршруты могут быть определены в отдельных модулях и затем добавлены в главный роутер приложения.
// Это делает приложение более модульным и масштабируемым.
