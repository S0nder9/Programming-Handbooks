// Глава 1: Введение в MongoDB - Авторизация, Роли и Разрешения Пользователей

// MongoDB предоставляет гибкие возможности для управления доступом, включая использование ролей и разрешений.
// В этой главе рассмотрим, как реализовать проверку ролей для ограничения доступа к определенным маршрутам в приложении.

// 1. Определение ролей и их значений в модели пользователя
// В модели пользователя (например, UserModel.js) можно задать доступные роли, такие как "user", "admin", "guide", "lead-guide".
// Роль по умолчанию — "user", что ограничивает доступ к определенным маршрутам.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please tell us your name!'] },
  email: { type: String, required: [true, 'Please provide your email'], unique: true },
  role: {
    type: String,
    enum: ["user", "admin", "guide", "lead-guide"],
    default: "user",
  },
  password: { type: String, required: [true, 'Please provide a password'], minlength: 8 },
  passwordConfirm: { type: String, required: [true, 'Please confirm your password'] },
});

// 2. Проверка авторизации с помощью middleware
// Создадим middleware restrictTo, чтобы ограничить доступ к маршрутам в зависимости от роли пользователя.
// Если роль пользователя не входит в список разрешенных ролей, возвращается ошибка 403 (Доступ запрещен).

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You don't have permission!", 403));
    }
    next();
  };
};

// 3. Применение middleware к маршрутам
// На определенные маршруты можно добавить middleware restrictTo для ограничения доступа к методам, таким как обновление и удаление.
// Например, только пользователи с ролью "admin" или "lead-guide" смогут удалять записи.

const express = require('express');
const router = express.Router();
const tourController = require('./controllers/tourController');
const authController = require('./controllers/authController');

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(authController.protect, authController.restrictTo("admin", "lead-guide"), tourController.updateTour)
  .delete(authController.protect, authController.restrictTo("admin", "lead-guide"), tourController.deleteTour);

// 4. Создание пользователя с ролью "admin"
// При создании нового пользователя можно указать его роль, например "admin".
// Такой пользователь получит расширенные права доступа.

const newAdminUser = {
  email: "testAdmin@gmail.com",
  password: "12345678",
  name: "AdminJonas",
  passwordConfirm: "12345678",
  role: "admin"
};

// Итог:
// Используя роли и middleware restrictTo, можно эффективно управлять правами доступа в приложении на Node.js и MongoDB.
// Это помогает защитить данные и гарантировать, что только авторизованные пользователи могут выполнять определенные действия.
