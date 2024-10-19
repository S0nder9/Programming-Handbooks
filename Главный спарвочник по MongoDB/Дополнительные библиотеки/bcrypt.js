
// Глава 1: Дополнительные библиотеки - bcryptjs

// Библиотека bcryptjs используется для хеширования паролей и других данных с целью повышения безопасности приложений.
// В этой главе мы рассмотрим, как установить и использовать bcryptjs в своих проектах на Node.js.

// Установка
// Для установки библиотеки bcryptjs необходимо использовать npm:
npm install bcryptjs

// Использование
// Основная цель использования bcryptjs - хеширование паролей перед их сохранением в базе данных, а также проверка этих паролей при аутентификации пользователей.
// Основные методы библиотеки:

// 1. Хеширование пароля
// Метод `hash` позволяет создать хеш для заданного пароля.
const bcrypt = require('bcryptjs');

const password = 'mySecurePassword'; // Пароль для хеширования
const saltRounds = 10; // Количество раундов для соли

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hash);
    // Здесь вы можете сохранить хеш в базе данных
  }
});

// 2. Сравнение пароля
// Метод `compare` используется для проверки введенного пароля с ранее сохраненным хешем.
const hashedPassword = '$2a$10$...'; // Полученный хеш пароля из базы данных

bcrypt.compare(password, hashedPassword, (err, isMatch) => {
  if (err) {
    console.error('Error comparing password:', err);
  } else if (isMatch) {
    console.log('Пароль совпадает!');
    // Логика для успешной аутентификации
  } else {
    console.log('Пароль не совпадает.');
    // Логика для неуспешной аутентификации
  }
});

// 3. Генерация соли
// Метод `genSalt` позволяет создать соль, которая используется для хеширования паролей.
bcrypt.genSalt(saltRounds, (err, salt) => {
  if (err) {
    console.error('Error generating salt:', err);
  } else {
    console.log('Generated salt:', salt);
    // Здесь вы можете использовать соль для хеширования пароля
  }
});

// 4. Асинхронные версии методов
// Все методы bcryptjs также имеют асинхронные версии, которые возвращают промис. Это упрощает использование с async/await.
const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Пример использования асинхронных методов:
(async () => {
  try {
    const hashedPassword = await hashPassword(password);
    console.log('Hashed password:', hashedPassword);

    const isMatch = await comparePasswords(password, hashedPassword);
    console.log('Пароль совпадает:', isMatch);
  } catch (error) {
    console.error('Error:', error);
  }
})();

// Итог:
// Библиотека bcryptjs является мощным инструментом для безопасного хеширования паролей и их проверки в приложениях на Node.js.
// Используйте ее, чтобы защитить учетные данные пользователей и предотвратить несанкционированный доступ к аккаунтам.






// Пример использования bcryptjs для хеширования пароля:
const bcrypt = require('bcryptjs');

// Функция для хеширования пароля
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // Генерация соли
  const hashedPassword = await bcrypt.hash(password, salt); // Хеширование пароля
  return hashedPassword;
};

// Пример использования в Mongoose:
// Для работы с bcryptjs в Mongoose, мы можем использовать middleware для автоматического хеширования пароля перед сохранением документа.

const mongoose = require('mongoose');

// Создание схемы пользователя
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Middleware для хеширования пароля перед сохранением
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Если пароль не изменился, переходим к следующему шагу
  this.password = await hashPassword(this.password); // Хешируем пароль
  next(); // Переход к следующему шагу
});

// Создание модели пользователя
const User = mongoose.model('User', userSchema);

// Пример создания нового пользователя
const createUser = async (username, password) => {
  const user = new User({ username, password });
  await user.save();
  console.log('User created:', user);
};

// Функция для сравнения пароля
const comparePassword = async (inputPassword, storedPassword) => {
  const isMatch = await bcrypt.compare(inputPassword, storedPassword); // Сравнение паролей
  return isMatch;
};

// Пример использования функции comparePassword
const loginUser = async (username, inputPassword) => {
  const user = await User.findOne({ username });
  if (!user) {
    console.log('User not found');
    return;
  }
  const isMatch = await comparePassword(inputPassword, user.password);
  if (isMatch) {
    console.log('Login successful');
  } else {
    console.log('Invalid password');
  }
};

// Итог:
// Библиотека bcryptjs предоставляет надежный способ хеширования паролей и их сравнения. 
// Используя ее в комбинации с Mongoose, вы можете легко обеспечить безопасность паролей пользователей в вашем приложении.
