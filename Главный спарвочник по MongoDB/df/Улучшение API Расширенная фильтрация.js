// Глава 1: Введение в MongoDB - Улучшение API Расширенная фильтрация

// MongoDB — это NoSQL база данных, которая широко используется для хранения данных в формате JSON-подобных документов.
// В этой главе мы рассмотрим, как улучшить API с помощью расширенной фильтрации данных в MongoDB.

// Введение:
// Одним из ключевых преимуществ MongoDB является мощная система фильтрации данных.
// Мы можем легко создавать запросы с несколькими критериями поиска, используя операторы, такие как $gte, $lte, $in и другие.
// Эти операторы позволяют нам строить сложные фильтры для более гибкой работы с данными в API.

// Пример задачи:
// Допустим, у нас есть коллекция продуктов, и мы хотим сделать API, который позволит пользователям фильтровать товары по цене, категории и рейтингу.

// Шаг 1: Создание фильтров с использованием операторов MongoDB
// MongoDB предоставляет мощные операторы для создания гибких фильтров.
// Вот основные операторы, которые мы будем использовать:
// - $gte: "greater than or equal" (больше или равно)
// - $lte: "less than or equal" (меньше или равно)
// - $in: проверка наличия значения в массиве

// Пример фильтрации товаров по цене, категории и рейтингу:
const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

// Подключение к MongoDB
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'shop';
let db;

async function connectToDB() {
  await client.connect();
  console.log('Connected to MongoDB');
  db = client.db(dbName);
}

connectToDB();

// Маршрут для фильтрации товаров
app.get('/products', async (req, res) => {
  try {
    const { priceMin, priceMax, category, ratingMin } = req.query;

    // Формирование фильтра на основе переданных параметров
    const filter = {};

    if (priceMin) {
      filter.price = { ...filter.price, $gte: parseFloat(priceMin) };
    }

    if (priceMax) {
      filter.price = { ...filter.price, $lte: parseFloat(priceMax) };
    }

    if (category) {
      filter.category = { $in: category.split(',') };
    }

    if (ratingMin) {
      filter.rating = { $gte: parseFloat(ratingMin) };
    }

    // Запрос в MongoDB с применением фильтра
    const products = await db.collection('products').find(filter).toArray();

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Шаг 2: Улучшение фильтрации с сортировкой и пагинацией
// Для улучшения функционала нашего API мы можем добавить сортировку и пагинацию.
// Пагинация помогает работать с большими массивами данных, а сортировка — выводить результаты в нужном порядке.

// Пример реализации сортировки и пагинации:
app.get('/products', async (req, res) => {
  try {
    const { priceMin, priceMax, category, ratingMin, sortBy, limit = 10, page = 1 } = req.query;

    const filter = {};

    if (priceMin) {
      filter.price = { ...filter.price, $gte: parseFloat(priceMin) };
    }

    if (priceMax) {
      filter.price = { ...filter.price, $lte: parseFloat(priceMax) };
    }

    if (category) {
      filter.category = { $in: category.split(',') };
    }

    if (ratingMin) {
      filter.rating = { $gte: parseFloat(ratingMin) };
    }

    const sortOptions = {};
    if (sortBy) {
      const [field, order] = sortBy.split(':');
      sortOptions[field] = order === 'desc' ? -1 : 1;
    }

    // Пагинация: вычисляем пропуск и лимит данных для каждой страницы
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await db.collection('products')
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Шаг 3: Обработка ошибок и валидация данных
// Важно добавить обработку ошибок и валидацию входящих данных для обеспечения надежной работы API.
// Пример валидации параметров фильтрации:
app.get('/products', async (req, res) => {
  try {
    const { priceMin, priceMax, category, ratingMin, sortBy, limit = 10, page = 1 } = req.query;

    // Валидация данных
    if (priceMin && isNaN(priceMin)) {
      return res.status(400).json({ error: 'Invalid priceMin value' });
    }

    if (priceMax && isNaN(priceMax)) {
      return res.status(400).json({ error: 'Invalid priceMax value' });
    }

    if (ratingMin && isNaN(ratingMin)) {
      return res.status(400).json({ error: 'Invalid ratingMin value' });
    }

    if (sortBy && !sortBy.includes(':')) {
      return res.status(400).json({ error: 'Invalid sortBy format, expected field:order' });
    }

    // Формирование фильтра...
    const filter = {};
    if (priceMin) {
      filter.price = { ...filter.price, $gte: parseFloat(priceMin) };
    }
    if (priceMax) {
      filter.price = { ...filter.price, $lte: parseFloat(priceMax) };
    }
    if (category) {
      filter.category = { $in: category.split(',') };
    }
    if (ratingMin) {
      filter.rating = { $gte: parseFloat(ratingMin) };
    }

    // Сортировка и пагинация...
    const sortOptions = {};
    if (sortBy) {
      const [field, order] = sortBy.split(':');
      sortOptions[field] = order === 'desc' ? -1 : 1;
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const products = await db.collection('products')
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Итог:
// Расширенная фильтрация данных в MongoDB позволяет создать гибкое и мощное API.
// Используя такие операторы, как $gte, $lte и $in, можно легко добавить фильтрацию по нескольким параметрам, 
// а также реализовать сортировку и пагинацию для улучшения пользовательского опыта при работе с большими данными.
