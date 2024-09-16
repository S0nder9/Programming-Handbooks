// Глава 1: Введение в MongoDB - Рефакторинг для MVC

// MongoDB — это нереляционная база данных, которая позволяет гибко работать с данными в формате JSON-подобных документов.
// В этой главе мы рассмотрим, как использовать MongoDB в Node.js проекте, следуя архитектурному паттерну MVC (Model-View-Controller).

// MVC разделяет приложение на три части:
// 1. Model — управляет данными и взаимодействием с базой данных.
// 2. View — отвечает за отображение данных (фронтенд).
// 3. Controller — управляет логикой приложения и связывает модель с представлением.

// 1. Подключение к MongoDB
// Прежде всего, необходимо подключить MongoDB к вашему Node.js приложению.
// Для этого используется пакет `mongoose`, который обеспечивает простое взаимодействие с MongoDB.
const mongoose = require('mongoose');

// Подключение к базе данных
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2. Создание модели (Model)
// Модель описывает структуру данных, хранимых в MongoDB.
// Для этого используются схемы, определенные с помощью `mongoose.Schema`.

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Экспорт модели для использования в других частях приложения
const User = mongoose.model('User', userSchema);

// 3. Контроллер (Controller)
// Контроллер управляет логикой приложения и обрабатывает запросы с фронтенда.
// В контроллере мы взаимодействуем с моделью для получения, создания, обновления или удаления данных.

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Создание нового пользователя
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user', details: err });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users', details: err });
  }
};

// Экспорт функций контроллера для использования в маршрутах
module.exports = { createUser, getAllUsers };

// 4. Маршруты (Routing)
// Для связывания запросов с контроллером используются маршруты. Они обрабатывают запросы от клиента и перенаправляют их в соответствующие контроллеры.
const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');

// Маршрут для создания пользователя
router.post('/users', userController.createUser);

// Маршрут для получения всех пользователей
router.get('/users', userController.getAllUsers);

// Экспорт маршрутов для использования в основном приложении
module.exports = router;

// 5. Инициализация приложения (App Initialization)
// Наконец, необходимо собрать все части вместе в основном файле приложения. Мы подключаем маршруты, которые будут связаны с контроллерами и моделями.

const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

// Использование middleware для обработки JSON
app.use(express.json());

// Использование маршрутов
app.use('/api', userRoutes);

// Запуск сервера
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Итог:
// Архитектурный паттерн MVC помогает организовать код приложения, отделяя логику, связанную с данными (Model), логику бизнес-процессов (Controller) и пользовательский интерфейс (View).
// MongoDB, в сочетании с Mongoose, позволяет легко управлять данными, а применение MVC делает приложение более структурированным и поддерживаемым.
