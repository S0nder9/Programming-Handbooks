// Глава 1: Введение в MongoDB - Управление паролями

// В этом разделе мы рассмотрим, как управлять паролями пользователей в приложении с использованием MongoDB и Mongoose.
// Мы будем использовать библиотеку bcrypt для безопасного хеширования паролей перед их сохранением в базе данных.

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// Определение схемы пользователя
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Пожалуйста, укажите ваше имя!"],
        maxlength: [
            50,
            "Имя пользователя должно содержать не более 50 символов!",
        ],
    },
    email: {
        type: String,
        required: [true, "Пожалуйста, укажите ваш email!"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Пожалуйста, предоставьте действительный email!"],
    },
    password: {
        type: String,
        required: [true, "Пожалуйста, укажите пароль!"],
        minlength: 8,
    },
    photo: {
        type: String,
        default: "default.jpg",
    },
    passwordConfirm: {
        type: String,
        required: [true, "Пожалуйста, подтвердите ваш пароль!"],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Пароли не совпадают!",
        },
    },
});

// Хук pre-save для хеширования пароля перед сохранением в базе данных
userSchema.pre("save", async function (next) {
    // Проверяем, изменился ли пароль
    if (!this.isModified("password")) return next();

    // Хешируем пароль с помощью bcrypt
    this.password = await bcrypt.hash(this.password, 12);

    // Убираем поле passwordConfirm после хеширования пароля
    this.passwordConfirm = undefined;
    next();
});

// Создаем модель пользователя на основе схемы
const User = mongoose.model("User", userSchema);

// Экспортируем модель для использования в других частях приложения
module.exports = User;

// Итог:
// Мы создали схему пользователя с валидацией, которая включает имя, email, пароль и подтверждение пароля.
// Перед сохранением пользователя в базе данных мы хешируем пароль для обеспечения безопасности.
