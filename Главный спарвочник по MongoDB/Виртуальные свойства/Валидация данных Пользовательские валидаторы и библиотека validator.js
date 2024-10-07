// Глава 1: Введение в MongoDB - Валидация данных
// Пользовательские валидаторы и библиотека validator (mongoose)

// Валидация данных — это важный аспект при работе с базой данных MongoDB для обеспечения целостности данных.
// Mongoose предоставляет встроенные средства валидации, а также возможность создания пользовательских валидаторов.
// Помимо этого, можно использовать библиотеку 'validator' для проверки полей модели, таких как email, URL и т.д.

// 1. Стандартные средства валидации в Mongoose
// Mongoose позволяет задавать валидацию на уровне схемы. Например, можно задать, что поле обязательно или должно иметь определенную длину.

// Пример стандартной валидации:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true, // Поле обязательно для заполнения
    minlength: 3 // Минимальная длина имени — 3 символа
  },
  email: {
    type: String,
    required: true, // Email обязателен
    unique: true // Email должен быть уникальным
  },
  age: {
    type: Number,
    min: 18, // Минимальный возраст
    max: 100 // Максимальный возраст
  }
});

// Модель пользователя
const User = mongoose.model('User', userSchema);

// 2. Пользовательские валидаторы
// Mongoose позволяет добавлять пользовательские валидаторы для более сложных проверок данных.
// Пользовательский валидатор — это функция, которая возвращает true, если данные валидны, и false в противном случае.

userSchema.path('email').validate((email) => {
  return email.includes('@'); // Простая проверка наличия символа '@' в email
}, 'Invalid email address'); // Сообщение об ошибке, если валидация не пройдена

// Пример использования пользовательского валидатора для проверки возраста:
userSchema.path('age').validate((age) => {
  return age >= 18 && age <= 100; // Проверка, что возраст находится в диапазоне 18-100
}, 'Age must be between 18 and 100');

// 3. Библиотека validator
// Библиотека validator предоставляет готовые валидаторы для таких проверок, как валидация email, URL и других данных.
// Для использования необходимо установить библиотеку: npm install validator

const validator = require('validator');

// Пример использования validator в схеме Mongoose:
userSchema.path('email').validate((email) => {
  return validator.isEmail(email); // Используем isEmail для проверки корректности email
}, 'Invalid email format');

// Также можно использовать библиотеку для валидации URL:
userSchema.path('website').validate((website) => {
  return validator.isURL(website); // Проверяем, что значение является корректным URL
}, 'Invalid website URL');

// 4. Пример создания модели с несколькими валидаторами:
const personSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Invalid email format'
    }
  },
  website: {
    type: String,
    validate: {
      validator: (website) => validator.isURL(website),
      message: 'Invalid URL format'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: (password) => {
        // Проверяем наличие хотя бы одной цифры и одной буквы
        return /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
      },
      message: 'Password must contain both letters and numbers'
    }
  }
});

// Модель Person
const Person = mongoose.model('Person', personSchema);

// Итог:
// Валидация данных является важной частью работы с MongoDB через Mongoose.
// Вы можете использовать стандартные средства валидации, создавать пользовательские валидаторы, а также подключать библиотеку validator для проверки сложных типов данных, таких как email и URL.
// Это помогает обеспечить целостность данных и улучшить безопасность вашего приложения.
