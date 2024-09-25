// Глава 1: Введение в MongoDB - Улучшение фильтрации в API через req.query

// Когда вы создаете API для взаимодействия с базой данных MongoDB, фильтрация данных через запросы является важной частью.
// Улучшение фильтрации помогает делать запросы гибкими и эффективными. В этой главе рассмотрим, как можно улучшить фильтрацию в API, используя MongoDB и Express.

// Основы фильтрации через req.query:
// req.query — это объект, содержащий параметры запроса. Например, если запрос выглядит так: `/api/products?category=books&price[gt]=20`, 
// объект req.query будет содержать `{ category: 'books', price: { gt: '20' } }`.

// 1. Базовая фильтрация
// Фильтрация начинается с простых запросов, например, поиска продуктов по категории или цене.
// Пример запроса с базовой фильтрацией по категории:

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Пример модели товара
const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
}));

// Базовая фильтрация с использованием req.query
app.get('/api/products', async (req, res) => {
  const query = req.query;

  // Создаем объект фильтра на основе параметров запроса
  const filter = {};
  if (query.category) filter.category = query.category; // фильтрация по категории
  if (query.name) filter.name = new RegExp(query.name, 'i'); // фильтрация по имени (регистронезависимый поиск)

  const products = await Product.find(filter);
  res.json(products);
});

// 2. Расширенная фильтрация с операторами MongoDB
// MongoDB поддерживает операторы, такие как `$gt` (больше чем), `$lt` (меньше чем), `$in` (в списке значений) и другие.
// Например, фильтрация по цене, где цена больше 20 и меньше 100, может выглядеть так:

app.get('/api/products', async (req, res) => {
  const query = req.query;
  const filter = {};

  // Фильтрация по категории
  if (query.category) filter.category = query.category;

  // Фильтрация по имени (регистронезависимый поиск)
  if (query.name) filter.name = new RegExp(query.name, 'i');

  // Фильтрация по цене
  if (query.price) {
    filter.price = {};
    if (query.price.gt) filter.price.$gt = parseFloat(query.price.gt); // больше чем
    if (query.price.lt) filter.price.$lt = parseFloat(query.price.lt); // меньше чем
  }

  const products = await Product.find(filter);
  res.json(products);
});

// 3. Фильтрация по нескольким значениям с использованием $in
// Оператор `$in` позволяет фильтровать документы, где поле содержит одно из нескольких значений. Это полезно для фильтрации по категориям или тегам.

app.get('/api/products', async (req, res) => {
  const query = req.query;
  const filter = {};

  // Фильтрация по категориям (если передано несколько категорий)
  if (query.categories) {
    const categoriesArray = query.categories.split(','); // Преобразуем строку в массив
    filter.category = { $in: categoriesArray }; // Фильтрация по нескольким категориям
  }

  const products = await Product.find(filter);
  res.json(products);
});

// 4. Пагинация и сортировка
// Для улучшения работы с большим объемом данных можно добавить пагинацию и сортировку.
// Это поможет контролировать количество возвращаемых данных и их порядок.

app.get('/api/products', async (req, res) => {
  const query = req.query;
  const filter = {};
  const sort = {};

  // Фильтрация по категории
  if (query.category) filter.category = query.category;

  // Фильтрация по имени
  if (query.name) filter.name = new RegExp(query.name, 'i');

  // Фильтрация по цене
  if (query.price) {
    filter.price = {};
    if (query.price.gt) filter.price.$gt = parseFloat(query.price.gt);
    if (query.price.lt) filter.price.$lt = parseFloat(query.price.lt);
  }

  // Пагинация
  const page = parseInt(query.page) || 1; // Текущая страница
  const limit = parseInt(query.limit) || 10; // Количество записей на странице
  const skip = (page - 1) * limit; // Пропускаем записи для текущей страницы

  // Сортировка
  if (query.sortBy) {
    const sortOrder = query.order === 'desc' ? -1 : 1; // Порядок сортировки
    sort[query.sortBy] = sortOrder; // Например, сортировка по цене: ?sortBy=price&order=desc
  }

  const products = await Product.find(filter)
    .sort(sort) // Применяем сортировку
    .skip(skip) // Пропускаем записи для пагинации
    .limit(limit); // Ограничиваем количество записей

  res.json(products);
});

// 5. Обработка ошибок и валидация
// Важно обрабатывать ошибки и валидацию параметров запроса, чтобы предотвратить неправильные запросы.
// Пример проверки корректности данных и обработки ошибок:

app.get('/api/products', async (req, res) => {
  try {
    const query = req.query;
    const filter = {};

    // Проверка фильтра по цене
    if (query.price) {
      if (isNaN(query.price.gt) || isNaN(query.price.lt)) {
        return res.status(400).json({ error: 'Некорректные параметры цены' });
      }
      filter.price = {};
      if (query.price.gt) filter.price.$gt = parseFloat(query.price.gt);
      if (query.price.lt) filter.price.$lt = parseFloat(query.price.lt);
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Итог:
// Улучшение фильтрации через req.query позволяет делать API более гибким и удобным для пользователей.
// Использование операторов MongoDB, таких как $gt, $lt и $in, добавление пагинации и сортировки, а также обработка ошибок помогают создавать эффективные и стабильные API.
