// Глава 1: Введение в MongoDB - Вход в систему пользователей

// Вход в систему — это одна из ключевых функций любого приложения, работающего с MongoDB. 
// В этой главе мы рассмотрим, как настроить процесс входа с использованием Node.js, Express и MongoDB.

// 1. Проверка входных данных
// При входе пользователя необходимо проверять, предоставлены ли email и пароль. 
// Если одно из полей не заполнено, возвращается ошибка 400 (Bad Request).
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Проверяем, указаны ли email и пароль
    if (!email || !password) {
        return next(new AppError("Please provide email and password", 400));
    }

    // Ищем пользователя по email и явно запрашиваем пароль из базы данных
    const user = await User.findOne({ email }).select("+password");

    // Проверяем, существует ли пользователь и правильный ли пароль
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email or password", 401)); // Ошибка аутентификации
    }

    // Создаем JWT токен для пользователя
    const token = signToken(user._id);

    // Отправляем ответ с токеном
    res.status(200).json({
        status: "success",
        token,
    });
});

// 2. Метод для проверки пароля
// Создадим метод экземпляра в модели пользователя, чтобы сравнивать введенный пароль с хешированным паролем из базы данных.
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

// 3. Определение схемы пользователя
// В схеме пользователя пароль должен быть обязательным полем и не должен возвращаться при обычных запросах, поэтому используется select: false.
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email!"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        minlength: 8,
        select: false, // Скрывает пароль по умолчанию при запросах
    },
    // Дополнительные поля схемы...
});

// Итог:
// Для настройки входа в систему пользователей с использованием MongoDB необходимо:
// 1. Проверить, что email и пароль переданы корректно.
// 2. Найти пользователя в базе данных по email и проверить введенный пароль.
// 3. Вернуть JWT токен при успешной аутентификации.
// 4. Использовать метод экземпляра модели для сравнения паролей с использованием bcrypt.
