// Глава 1: Дополнительные библиотеки: validator

// Библиотека `validator` — это мощный инструмент для проверки и валидации данных в Node.js.
// Она предоставляет множество функций, которые помогают проверять строки на соответствие различным форматам, таким как email, URL, IP-адреса и другие.
// В этой главе мы рассмотрим, как использовать библиотеку `validator` для валидации данных в ваших приложениях.

// Установка библиотеки:
// Перед началом использования необходимо установить библиотеку с помощью npm:
// npm install validator

// Импорт библиотеки в ваш проект:
const validator = require("validator");

// 1. Проверка email
// Функция `isEmail` позволяет проверять, является ли строка корректным email-адресом.
const email = "test@example.com";
console.log(validator.isEmail(email)); // true

// Пример некорректного email:
const invalidEmail = "test@example";
console.log(validator.isEmail(invalidEmail)); // false

// 2. Проверка URL
// Функция `isURL` проверяет, является ли строка валидным URL.
const url = "https://www.example.com";
console.log(validator.isURL(url)); // true

// Пример некорректного URL:
const invalidUrl = "htp://example";
console.log(validator.isURL(invalidUrl)); // false

// 3. Проверка пустой строки
// Функция `isEmpty` позволяет проверить, является ли строка пустой.
const emptyString = "";
console.log(validator.isEmpty(emptyString)); // true

// Пример непустой строки:
const notEmptyString = "Hello";
console.log(validator.isEmpty(notEmptyString)); // false

// 4. Проверка чисел
// Функция `isNumeric` проверяет, состоит ли строка из чисел.
const numberString = "12345";
console.log(validator.isNumeric(numberString)); // true

// Пример строки с нечисловым значением:
const nonNumberString = "123abc";
console.log(validator.isNumeric(nonNumberString)); // false

// 5. Проверка на наличие только букв
// Функция `isAlpha` проверяет, содержит ли строка только буквы (без цифр и символов).
const alphaString = "HelloWorld";
console.log(validator.isAlpha(alphaString)); // true

// Пример строки с цифрами:
const notAlphaString = "Hello123";
console.log(validator.isAlpha(notAlphaString)); // false

// 6. Проверка длины строки
// Функция `isLength` позволяет проверить, соответствует ли длина строки заданным параметрам.
const shortString = "Hello";
console.log(validator.isLength(shortString, { min: 3, max: 10 })); // true

// Пример строки, длина которой меньше минимального значения:
const tooShortString = "Hi";
console.log(validator.isLength(tooShortString, { min: 3 })); // false

// 7. Проверка на наличие определенных символов
// Функция `contains` проверяет, содержит ли строка определенную подстроку или символ.
const text = "The quick brown fox jumps over the lazy dog.";
console.log(validator.contains(text, "fox")); // true

// Пример поиска символа, которого нет в строке:
console.log(validator.contains(text, "cat")); // false

// 8. Проверка IP-адреса
// Функция `isIP` проверяет, является ли строка валидным IP-адресом (IPv4 или IPv6).
const ipAddress = "192.168.0.1";
console.log(validator.isIP(ipAddress)); // true

// Пример некорректного IP-адреса:
const invalidIp = "999.999.999.999";
console.log(validator.isIP(invalidIp)); // false

// 9. Проверка даты
// Функция `isDate` позволяет проверить, является ли строка валидной датой.
const validDate = "2024-10-19";
console.log(validator.isDate(validDate)); // true

// Пример некорректной даты:
const invalidDate = "2024-13-45";
console.log(validator.isDate(invalidDate)); // false

// Итог:
// Библиотека `validator` предоставляет множество полезных функций для проверки и валидации данных в приложениях Node.js.
// Она позволяет легко проверять email, URL, IP-адреса, даты и другие типы данных, помогая создавать более надежные и безопасные приложения.


// 2. Использование validator в схеме Mongoose

// Валидация данных часто используется при работе с базой данных. Например, при создании схемы модели Mongoose можно встроить проверку данных с помощью validator.
// Установка Mongoose:
// npm install mongoose

const mongoose = require('mongoose');

// Создание схемы пользователя с проверкой email и пароля с использованием validator:
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Invalid email format'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    validate: {
      validator: (value) => validator.isStrongPassword(value),
      message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol'
    }
  },
  website: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Invalid URL format'
    },
    required: false
  },
  age: {
    type: Number,
    validate: {
      validator: (value) => validator.isInt(value.toString(), { min: 0 }),
      message: 'Age must be a non-negative integer'
    }
  }
});

// Модель пользователя на основе схемы:
const User = mongoose.model('User', userSchema);

// Пример создания пользователя с использованием модели:
const newUser = new User({
  email: 'test@example.com',
  password: 'Test@1234',
  website: 'https://example.com',
  age: 25
});

newUser.save()
  .then(() => console.log('User created successfully'))
  .catch((error) => console.error('Error creating user:', error));

// Итог:
// Библиотека validator позволяет удобно проверять и нормализовать данные в Node.js.
// При использовании Mongoose можно встроить validator в схемы моделей для обеспечения валидности данных при их сохранении в базе данных MongoDB.
