// Глава 1: Введение в MongoDB - Функциональность сброса пароля

// В этом разделе мы рассмотрим функциональность сброса пароля в приложении на Node.js с использованием MongoDB для хранения пользователей.
// Для реализации сброса пароля используется создание и валидация токена сброса, который позволяет пользователю безопасно изменить пароль.

// Экспортируемая функция forgotPassword:
// Метод forgotPassword создает токен сброса и сохраняет его в базе данных для пользователя, запросившего сброс пароля.
// Если пользователь с указанным email не найден, возвращается сообщение об ошибке.

exports.forgotPassword = catchAsync(async (req, res, next) => {
    // Находим пользователя по email
    const user = await User.findOne({
        email: req.body.email,
    });

    // Если пользователь не найден, возвращаем ошибку
    if (!user) {
        next(new AppError("There is no user with that email address!", 404));
    }

    // Создаем токен сброса пароля для пользователя
    const resetToken = user.createPasswordResetToken();

    // Сохраняем пользователя, пропуская валидацию перед сохранением
    await user.save({ validateBeforeSave: false });

    // Здесь можно отправить email с токеном сброса пользователю (не показано в этом примере)

    res.status(200).json({
        status: 'success',
        message: 'Token sent to email!',
        data: { resetToken }
    });
});

// Экспортируемая функция resetPassword:
// Метод resetPassword (на данный момент пустой) будет реализован для завершения процесса сброса пароля.
// Он будет принимать токен и новый пароль пользователя, верифицировать токен и обновлять пароль пользователя в базе данных.

exports.resetPassword = (req, res, next) => {
    // Реализация сброса пароля будет добавлена здесь
};

// Настройка маршрута для сброса пароля:
// Добавляем маршрут forgotPassword для отправки запроса на сброс пароля с указанием email пользователя.
userRouter.post("/forgotPassword", authController.forgotPassword);

// Методы модели пользователя:
// Метод createPasswordResetToken генерирует токен для сброса пароля и хеширует его перед сохранением.
// Хешированный токен сохраняется в базе данных, чтобы его можно было проверить позже, когда пользователь захочет сбросить пароль.

userSchema.methods.createPasswordResetToken = function () {
    // Генерируем токен сброса пароля
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Хешируем токен и сохраняем его в поле passwordResetToken
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Устанавливаем время истечения токена на 10 минут
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    console.log(
        { resetToken },
        this.passwordResetToken
    );

    // Возвращаем сгенерированный токен (не хешированный), чтобы его можно было отправить пользователю
    return resetToken;
};

// Поля схемы пользователя для сброса пароля:
// В схеме пользователя мы добавляем поля для хранения токена сброса и времени его истечения.

const userSchema = new mongoose.Schema({
    // ...остальные поля пользователя

    // Поле для хранения токена сброса пароля
    passwordResetToken: String,

    // Поле для хранения времени истечения токена
    passwordResetExpires: Date,
});

// Итог:
// Мы реализовали основу функциональности сброса пароля с помощью токена.
// Метод createPasswordResetToken генерирует токен и сохраняет его, 
// метод forgotPassword обрабатывает запрос на создание токена, 
// а метод resetPassword будет завершать процесс сброса, принимая токен и новый пароль.
