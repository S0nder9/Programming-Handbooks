// Глава 1: Введение в MongoDB - Моделирование пользователя

// При разработке приложений с использованием MongoDB и Mongoose важно правильно моделировать структуру данных.
// В этом примере мы создаем модель пользователя, которая будет использоваться для хранения информации о пользователях в базе данных.

// 1. Подключение необходимых модулей
// Мы подключаем Mongoose для работы с MongoDB и библиотеку Validator для валидации данных.
const mongoose = require("mongoose");
const validator = require("validator");

// 2. Определение схемы пользователя
// Мы создаем схему `userSchema`, которая определяет структуру документа пользователя в базе данных.
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name!"],
        maxlength: [
            50, // Исправлено значение ограничения длины имени
            "A User name must have less or equal than 50 characters!",
        ],
    },
    email: {
        type: String,
        required: [true, "Please tell us your email!"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email!"]
    },
    password: {
        type: String,
        required: [true, "Please tell us your password!"],
        minlength: [8, "Password must be at least 8 characters long"],
    },
    photo: {
        type: String,
        default: "default.jpg" // Указываем значение по умолчанию для фото пользователя
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password!"],
        validate: {
            // Используем кастомную функцию для проверки, совпадает ли подтверждение пароля с паролем
            validator: function (value) {
                return value === this.password;
            },
            message: "Passwords do not match!"
        }
    }
});

// 3. Создание модели пользователя
// Мы создаем модель `User` на основе схемы `userSchema`, которая будет использоваться для взаимодействия с коллекцией пользователей в базе данных.
const User = mongoose.model("User", userSchema);

// 4. Экспорт модели
// Экспортируем модель `User` для использования в других частях приложения.
module.exports = User;

// Примечание:
// - В схеме добавлена валидация для проверки, совпадают ли пароль и его подтверждение (passwordConfirm).
// - Для фото пользователя добавлено значение по умолчанию ("default.jpg").
// - Длина имени пользователя увеличена до 50 символов.
// - Модель пользователя позволяет организовать безопасное хранение и проверку данных в приложении.
