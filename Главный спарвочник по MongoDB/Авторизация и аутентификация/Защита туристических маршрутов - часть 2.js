// Глава 1: Введение в MongoDB - Защита туристических маршрутов - часть 2

// В этой части мы рассмотрим, как защитить туристические маршруты с использованием MongoDB и Node.js. 
// Мы создадим модель пользователя и реализуем защиту маршрутов с использованием аутентификации JWT. 
// Защита маршрутов позволяет убедиться, что только авторизованные пользователи могут получить доступ к защищенным данным.

// 1. Создание схемы пользователя (User Schema) с Mongoose
// Определим схему пользователя, которая включает имя, email, пароль и другие поля.

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// Определение схемы пользователя
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name!"],
        maxlength: [
            50,
            "A User name must have less or equal to 50 characters!",
        ],
    },
    email: {
        type: String,
        required: [true, "Please tell us your email!"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email!"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        minlength: 8,
        select: false,
    },
    photo: {
        type: String,
        default: "default.jpg",
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password!"],
        validate: {
            validator: function (el) {
                // Проверяем, что подтверждение пароля совпадает с паролем
                return el === this.password;
            },
            message: "Passwords are not the same!",
        },
    },
    passwordChangedAt: {
        type: Date,
        default: Date.now(),
    },
});

// 2. Хук pre-save для шифрования пароля
// Перед сохранением пользователя, если пароль был изменен, шифруем его с использованием bcrypt.

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    // Шифруем пароль с использованием bcrypt
    this.password = await bcrypt.hashSync(this.password, 12);

    // Убираем поле passwordConfirm перед сохранением в базу данных
    this.passwordConfirm = undefined;
    next();
});

// 3. Метод для проверки правильности пароля
// Метод позволяет сравнить введенный пользователем пароль с хешированным паролем в базе данных.

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

// 4. Метод для проверки, был ли пароль изменен после выдачи токена
// Метод сравнивает время изменения пароля с временем выдачи токена JWT.

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }

    return false;
};

// Создание модели пользователя (User)
const User = mongoose.model("User", userSchema);

module.exports = User;

// 5. Реализация защиты маршрутов (Protect Middleware)

// Для защиты маршрутов создаем промежуточное ПО (middleware), которое проверяет наличие и валидность JWT-токена.
exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        // Извлекаем токен из заголовка Authorization
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(
            new AppError(
                "You are not logged in! Please log in to get access.",
                401
            )
        );
    }

    // Верифицируем токен
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Находим пользователя по ID, закодированному в токене
    const freshUser = await User.findById(decoded.id);

    if (!freshUser) {
        return next(
            new AppError(
                "The user belonging to this token does no longer exist!",
                401
            )
        );
    }

    // Проверяем, не изменил ли пользователь пароль после выдачи токена
    if (freshUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError(
                "User recently changed password! Please log in again!",
                401
            )
        );
    };

    // Делаем пользователя доступным для следующего middleware
    req.user = freshUser;

    next();
});

// Итог:
// В этой части мы рассмотрели создание схемы пользователя, хук для шифрования паролей и методы для проверки пароля и изменений.
// Также мы реализовали защиту маршрутов с помощью JWT, чтобы обеспечить доступ только для авторизованных пользователей.
