// Глава 17: Веб фреймворк Express - Маршруты в отдельных файлах в Node.js

// Express - это популярный веб-фреймворк для Node.js, который упрощает создание серверов и маршрутов.
// Одним из важных аспектов разработки с использованием Express является организация маршрутов.
// Для улучшения структуры и читаемости кода, маршруты могут быть вынесены в отдельные файлы.

// Как работают маршруты в отдельных файлах:
// В большом приложении маршруты могут быть разделены на модули, каждый из которых отвечает за определенную часть функциональности.
// Это позволяет поддерживать код в чистоте и упрощает его поддержку.

// Пример создания сервера с использованием Express:
const express = require('express');
const app = express();
const port = 3000;

// Импортируем маршруты из внешнего файла
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

// Используем импортированные маршруты
app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Пример маршрутов в файле routes/users.js:
const express = require('express');
const router = express.Router();

// Определяем маршруты для пользователей
router.get('/', (req, res) => {
  res.send('List of users');
});

router.get('/:id', (req, res) => {
  res.send(`User with ID: ${req.params.id}`);
});

router.post('/', (req, res) => {
  res.send('Create a new user');
});

module.exports = router;

// Пример маршрутов в файле routes/products.js:
const express = require('express');
const router = express.Router();

// Определяем маршруты для продуктов
router.get('/', (req, res) => {
  res.send('List of products');
});

router.get('/:id', (req, res) => {
  res.send(`Product with ID: ${req.params.id}`);
});

router.post('/', (req, res) => {
  res.send('Create a new product');
});

module.exports = router;

// Итог:
// Разделение маршрутов на отдельные файлы помогает улучшить структуру и читаемость кода в приложении на Express.
// Это позволяет легко управлять различными частями функциональности и упрощает поддержку кода.
