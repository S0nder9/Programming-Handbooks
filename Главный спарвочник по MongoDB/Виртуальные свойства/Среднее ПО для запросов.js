// Глава 1: Введение в MongoDB - Среднее ПО для запросов

// MongoDB — это документоориентированная база данных NoSQL, которая используется для хранения данных в формате JSON-подобных документов.
// Для взаимодействия с MongoDB в Node.js часто используют библиотеку Mongoose, которая предоставляет удобный способ работы с базой данных и поддержку схем данных.
// В этой главе мы рассмотрим использование среднего ПО (middleware) для обработки запросов к базе данных.

// Что такое Middleware:
// В контексте веб-приложений среднее ПО (middleware) — это функции, которые выполняются между отправкой запроса клиентом и отправкой ответа сервером.
// В случае MongoDB и Mongoose middleware используется для обработки данных перед выполнением определённых операций (например, перед сохранением или удалением документа).

// Пример использования Mongoose в Node.js:
// Установка Mongoose:
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Подключение к MongoDB:
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Создание схемы и модели:
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

const User = mongoose.model('User', userSchema);

// Middleware в Mongoose:

// 1. Прехуки (Pre-hooks)
// Прехуки позволяют выполнить код до определённой операции, например, до сохранения документа в базу данных.
// Пример: проверка возраста перед сохранением пользователя.
userSchema.pre('save', function (next) {
  if (this.age < 18) {
    throw new Error('Возраст пользователя должен быть 18 лет или старше.');
  }
  next();
});

// 2. Постхуки (Post-hooks)
// Постхуки выполняются после выполнения операции. Это полезно для действий, таких как отправка уведомлений или логирование после выполнения операции.
// Пример: логирование после сохранения пользователя.
userSchema.post('save', function (doc, next) {
  console.log(`Пользователь ${doc.name} был успешно сохранен.`);
  next();
});

// Обработка запросов с использованием Middleware:
// Пример обработки запроса для создания нового пользователя с проверкой через middleware:
app.use(express.json());

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Среднее ПО в Express.js:
// В дополнение к Mongoose, среднее ПО можно использовать в Express для обработки запросов и выполнения различных операций между запросом и ответом.
// Пример: проверка заголовка запроса перед выполнением следующего middleware.
app.use((req, res, next) => {
  if (!req.headers['x-auth-token']) {
    return res.status(401).json({ message: 'Нет токена аутентификации' });
  }
  next();
});

// Пример использования запросов к MongoDB для получения данных о пользователе:
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Итог:
// Middleware — это важная часть веб-приложений, которая помогает организовать обработку данных на каждом этапе запроса.
// В MongoDB с использованием Mongoose middleware позволяет управлять данными перед и после операций с документами, а также помогает защитить приложение и обеспечить валидацию данных.
