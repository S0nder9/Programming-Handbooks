// Глава 1: Введение в MongoDB - Улучшение сортировки в API

// MongoDB является одной из самых популярных NoSQL баз данных, широко используемой в веб-приложениях для хранения и управления данными.
// В этой главе мы рассмотрим, как можно улучшить сортировку данных в API на основе MongoDB.

// Проблема:
// В REST API часто возникает необходимость сортировки данных, например, по дате создания, цене или другим параметрам.
// Основная задача — гибко управлять сортировкой на стороне сервера, чтобы она соответствовала требованиям клиента.

// Решение:
// В API на базе MongoDB и Express можно добавить функционал для сортировки данных по различным полям, используя запросы к базе данных.
// Мы также можем добавить поддержку сортировки по возрастанию или убыванию на основе входных параметров от клиента.

// Шаги по улучшению сортировки в API:

// 1. Получение параметров сортировки из запроса
// Клиент может передавать параметры сортировки через строку запроса. Например, сортировка может быть выполнена по полю "price" или "createdAt", а также в порядке возрастания или убывания.
// Пример запроса:
// GET /api/products?sortBy=price&order=desc

// 2. Пример API с сортировкой
// В этом примере API на основе MongoDB и Express реализуется сортировка продуктов по параметрам "sortBy" и "order".

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Определение схемы и модели для продуктов
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);

// Маршрут для получения продуктов с сортировкой
app.get('/api/products', async (req, res) => {
  try {
    // Получение параметров сортировки из запроса
    const sortBy = req.query.sortBy || 'createdAt'; // Поле для сортировки, по умолчанию сортировка по дате создания
    const order = req.query.order === 'desc' ? -1 : 1; // Порядок сортировки: 'asc' по возрастанию, 'desc' по убыванию

    // Запрос к базе данных с использованием сортировки
    const products = await Product.find().sort({ [sortBy]: order });

    // Возвращение отсортированных данных
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении продуктов', error });
  }
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// 3. Как это работает:
// - В строке запроса клиент может передать параметры `sortBy` и `order` для управления сортировкой.
// - Параметр `sortBy` указывает, по какому полю нужно отсортировать данные (например, 'price', 'name', 'createdAt').
// - Параметр `order` указывает порядок сортировки: 'asc' для возрастания и 'desc' для убывания.
// - На сервере MongoDB использует метод `.sort()` для выполнения сортировки по переданным параметрам.
// - Параметры запроса по умолчанию: сортировка по дате создания (`createdAt`) и по возрастанию.

// 4. Обработка некорректных значений
// Если клиент передает некорректные параметры сортировки, можно установить значения по умолчанию или вернуть ошибку.
// Например, если поле `sortBy` или порядок сортировки `order` неверны, сервер может автоматически использовать значения по умолчанию.

// 5. Расширение функционала сортировки
// Вы можете добавить более сложную сортировку по нескольким полям. Например, сначала отсортировать по дате, а затем по цене.
// Пример:
app.get('/api/products/multi-sort', async (req, res) => {
  try {
    // Пример сортировки по нескольким полям
    const products = await Product.find().sort({ createdAt: -1, price: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении продуктов', error });
  }
});

// Итог:
// Добавление сортировки в API на базе MongoDB значительно улучшает гибкость получения данных.
// Клиент может динамически управлять сортировкой по любым полям с использованием параметров запроса.
// Это решение помогает оптимизировать взаимодействие между фронтендом и бекендом, делая API более гибким и настраиваемым под разные задачи.
