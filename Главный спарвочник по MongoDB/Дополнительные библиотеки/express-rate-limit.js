// Глава 1: Введение в MongoDB (mongoose) - express-rate-limit

// В этой главе мы рассмотрим основные моменты настройки MongoDB и mongoose для Node.js-приложений, а также узнаем, как защитить сервер от избыточных запросов с помощью express-rate-limit.

// MongoDB и mongoose:
// MongoDB — это популярная NoSQL-база данных, которая позволяет хранить данные в виде документов JSON-подобной структуры.
// Mongoose — это библиотека, облегчающая взаимодействие с MongoDB, предоставляя модели, схемы и валидацию данных.

// Шаг 1: Подключение к MongoDB с помощью mongoose
// Для начала, установим необходимые пакеты mongoose и express-rate-limit, если они еще не установлены:
// npm install mongoose express-rate-limit

const mongoose = require('mongoose');

// Подключаемся к MongoDB (замените 'your_database_url' на ваш URL MongoDB)
mongoose.connect('your_database_url', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Шаг 2: Создание схемы и модели с помощью mongoose
// В mongoose данные определяются с помощью схемы, которая описывает структуру документа.

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Модель используется для взаимодействия с определенной коллекцией в MongoDB
const User = mongoose.model('User', userSchema);

// express-rate-limit:
// express-rate-limit — это промежуточное ПО (middleware) для ограничения количества запросов к серверу.
// Это помогает защитить приложение от атак типа «отказ в обслуживании» (DoS) и других чрезмерных запросов.

// Шаг 3: Настройка express-rate-limit
// Установим лимит на количество запросов с одного IP-адреса за определенный период времени.
// Например, лимит в 100 запросов в минуту.

const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

// Настройка ограничения запросов
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 минута
  max: 100, // Лимит 100 запросов
  message: 'Too many requests from this IP, please try again later.'
});

// Применение лимитера ко всем запросам
app.use(limiter);

// Пример маршрута для регистрации нового пользователя
app.post('/register', async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Пример маршрута для авторизации пользователя
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.password !== req.body.password) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    res.send({ message: 'Login successful' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Итог:
// В этой главе мы настроили соединение с MongoDB с использованием mongoose, создали модель пользователя, и добавили защиту от избыточных запросов с помощью express-rate-limit.
// Такая конфигурация помогает организовать удобное хранение данных в MongoDB и обезопасить сервер от перегрузок.
