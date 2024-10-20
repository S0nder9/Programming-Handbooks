// Глава 1: Введение в MongoDB - Как работает аутентификация с помощью JWT

// Аутентификация с использованием JWT (JSON Web Tokens) является популярным подходом для защиты API и управления доступом пользователей в приложениях с использованием MongoDB.
// В этой главе мы рассмотрим, как работает аутентификация с JWT и как можно интегрировать ее с MongoDB.

// 1. Основные концепции аутентификации с JWT
// - JWT — это токен, который сервер выдает пользователю после успешного входа в систему.
// - Токен содержит полезную информацию (payload), которая подписывается секретным ключом для защиты от подделок.
// - Пользователь отправляет этот токен с каждым запросом к защищенным маршрутам, и сервер верифицирует его, чтобы определить, имеет ли пользователь доступ.

// 2. Процесс аутентификации с JWT
// - Пользователь отправляет запрос на вход в систему с логином и паролем.
// - Сервер проверяет учетные данные пользователя в базе данных MongoDB.
// - Если данные верны, сервер создает JWT и отправляет его клиенту.
// - Клиент сохраняет токен (например, в localStorage или HTTP-Only cookie) и использует его для доступа к защищенным маршрутам API.

// 3. Пример кода аутентификации с JWT и MongoDB

// Подключаем необходимые библиотеки:
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User'); // Модель пользователя

const app = express();
const secretKey = 'your-secret-key';

// Middleware для обработки JSON
app.use(express.json());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 4. Создание маршрута для регистрации пользователя
// - Хэшируем пароль и сохраняем пользователя в базе данных
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// 5. Создание маршрута для входа в систему
// - Проверяем учетные данные и создаем JWT, если они верны
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Создаем JWT
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// 6. Middleware для аутентификации
// - Проверяем наличие и валидность токена перед доступом к защищенным маршрутам
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// 7. Пример защищенного маршрута
// - Только аутентифицированные пользователи могут получить доступ к этому маршруту
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the protected route!', user: req.user });
});

// 8. Итог
// В этом примере показан базовый процесс аутентификации с использованием JWT и MongoDB:
// - Регистрация пользователя с хэшированием пароля с помощью bcrypt.
// - Вход в систему и создание JWT, который отправляется клиенту.
// - Верификация токена на защищенных маршрутах с использованием middleware.

// Запуск сервера
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Использование JWT с MongoDB позволяет создать безопасную и масштабируемую систему аутентификации для ваших приложений.
