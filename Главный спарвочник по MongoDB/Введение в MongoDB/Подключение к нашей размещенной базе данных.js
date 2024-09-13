// Глава 1: Введение в MongoDB - Подключение к нашей размещенной базе данных

// MongoDB — это нереляционная база данных, которая часто используется в современных веб-приложениях.
// В этой главе мы рассмотрим, как подключиться к размещенной базе данных MongoDB и выполнять основные операции с данными.

// Для подключения к базе данных MongoDB в Node.js мы будем использовать библиотеку Mongoose, которая является популярным инструментом для работы с MongoDB.

// 1. Установка Mongoose
// Сначала установите Mongoose через npm:
npm install mongoose

// 2. Подключение к размещенной базе данных MongoDB
// MongoDB предлагает облачный сервис MongoDB Atlas, который позволяет размещать базы данных онлайн.
// После создания базы данных в MongoDB Atlas вы получите строку подключения, которая будет использоваться для соединения с базой данных.

// Пример строки подключения MongoDB Atlas:
// mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority

// Пример кода для подключения к базе данных MongoDB с использованием Mongoose:

const mongoose = require('mongoose');

// Функция для подключения к MongoDB
const connectToDatabase = async () => {
  try {
    // Подключение к базе данных с использованием строки подключения
    await mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// Вызов функции для подключения
connectToDatabase();

// 3. Основные параметры подключения:
// - useNewUrlParser: Этот параметр включает новый парсер URL для подключения к базе данных, который рекомендуется использовать для совместимости с новыми версиями MongoDB.
// - useUnifiedTopology: Этот параметр включает новый механизм мониторинга сервера для улучшенной совместимости и стабильности соединений.

// 4. Модели в Mongoose
// В Mongoose данные хранятся в моделях. Модель представляет собой структуру, которая описывает, как данные будут храниться в базе данных.
// Пример создания модели для коллекции "users":

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Создание модели на основе схемы
const User = mongoose.model('User', userSchema);

// 5. Выполнение операций с базой данных
// После подключения к базе данных и создания модели мы можем выполнять основные CRUD-операции (создание, чтение, обновление, удаление).

// Пример добавления нового пользователя в базу данных:
const createUser = async () => {
  try {
    const newUser = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'securepassword123',
    });
    await newUser.save();
    console.log('User created:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

// Пример получения пользователей из базы данных:
const getUsers = async () => {
  try {
    const users = await User.find();
    console.log('Users:', users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Вызов функций для добавления и получения пользователей
createUser();
getUsers();

// Итог:
// Подключение к размещенной базе данных MongoDB через Mongoose позволяет легко управлять данными в облаке.
// Мы рассмотрели процесс установки библиотеки, подключения к базе данных и выполнения основных операций с данными.
