// Глава 1: Введение в MongoDB - Подключение нашей базы данных к приложению Express App

// MongoDB — это популярная NoSQL база данных, которая позволяет хранить данные в виде документов JSON-подобных объектов.
// В этой главе мы рассмотрим, как подключить MongoDB к вашему приложению на базе Express.js.

// Шаг 1: Установка необходимых зависимостей
// Для работы с MongoDB в приложении Node.js мы будем использовать библиотеку Mongoose, которая является объектно-документным модулем (ODM) для MongoDB.

// Установим Mongoose через npm:
npm install mongoose

// После этого подключим Mongoose в нашем приложении.

// Шаг 2: Подключение к базе данных MongoDB
// Для начала создадим подключение к базе данных MongoDB с помощью Mongoose.

// Импортируем необходимые зависимости:
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Зададим URL для подключения к базе данных. Это может быть локальный сервер MongoDB или облачный сервис, например MongoDB Atlas.
const mongoURI = 'mongodb://localhost:27017/mydatabase'; // Замените на ваш MongoDB URI

// Подключаемся к базе данных MongoDB с помощью Mongoose:
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Шаг 3: Создание схемы и модели
// В MongoDB данные хранятся в коллекциях, каждая из которых состоит из документов.
// Мы можем определить структуру этих документов с помощью схемы в Mongoose и создать модель на основе этой схемы.

// Пример создания схемы для коллекции пользователей:
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Создаем модель на основе схемы:
const User = mongoose.model('User', userSchema);

// Теперь мы можем использовать модель `User` для работы с данными пользователей в нашей базе данных.

// Шаг 4: Создание маршрутов для взаимодействия с MongoDB
// После подключения к базе данных и создания модели, давайте создадим несколько маршрутов в нашем Express-приложении для работы с MongoDB.

// Пример маршрута для создания нового пользователя:
app.post('/users', async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    await newUser.save();
    res.status(201).send('User created');
  } catch (error) {
    res.status(400).send('Error creating user: ' + error.message);
  }
});

// Пример маршрута для получения всех пользователей:
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send('Error fetching users: ' + error.message);
  }
});

// Шаг 5: Запуск сервера
// Чтобы наше приложение заработало, нам нужно запустить сервер Express. Добавим прослушивание порта:

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Итог:
// Мы подключили MongoDB к нашему приложению Express, создали модель с помощью Mongoose, определили маршруты для создания и получения данных пользователей, и успешно настроили базовое взаимодействие между сервером и базой данных.
