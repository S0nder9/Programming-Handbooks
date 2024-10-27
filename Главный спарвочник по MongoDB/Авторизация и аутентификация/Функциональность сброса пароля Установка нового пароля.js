// Глава 1: Введение в MongoDB
// Функциональность сброса пароля - Установка нового пароля

// В этом разделе мы рассмотрим процесс сброса пароля в приложении, используя функциональность MongoDB и Node.js.
// Здесь представлено два основных обработчика: forgotPassword и resetPassword, которые обеспечивают пользователю возможность сброса и установки нового пароля.

// Функция forgotPassword
// Этот обработчик обрабатывает запрос на сброс пароля, создавая токен сброса и отправляя его по электронной почте пользователю.
exports.forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new AppError("There is no user with that email address!", 404));
    }

    // Создаем токен сброса пароля для пользователя
    const resetToken = user.createPasswordResetToken();

    // Сохраняем токен сброса в базе данных, не проверяя остальные поля перед сохранением
    await user.save({ validateBeforeSave: false });

    // Формируем URL для сброса пароля, который будет отправлен пользователю
    const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;

    // Сообщение, которое будет отправлено по электронной почте
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    try {
        // Отправляем электронное письмо с токеном сброса
        await sendEmail({
            email: user.email,
            subject: "Your password reset token (valid for 10 min)",
            message,
        });

        res.status(200).json({
            status: "success",
            message: "Token sent to email",
        });
    } catch (error) {
        // В случае ошибки отправки email, сбрасываем токен и срок его действия
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new AppError("There was an error sending the email. Try again later!", 500));
    }
});

// Функция resetPassword
// Этот обработчик проверяет токен сброса и устанавливает новый пароль для пользователя.
exports.resetPassword = catchAsync(async (req, res, next) => {
    // Хешируем токен, так как он сохранен в базе данных в зашифрованном виде
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    // Находим пользователя с токеном и проверяем, не истек ли его срок
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
        return next(new AppError("Token is invalid or has expired!", 400));
    }

    // Устанавливаем новый пароль
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    // Удаляем токен и срок действия токена после успешного сброса пароля
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    // Создаем новый JWT токен для пользователя после сброса пароля
    const token = signToken(user._id);

    res.status(201).json({
        status: "success",
        token,
    });
});

// Middleware для обновления времени изменения пароля
// Этот middleware устанавливает поле passwordChangedAt каждый раз при изменении пароля.
userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) return next();

    // Устанавливаем время изменения пароля с небольшой задержкой для корректной синхронизации
    this.passwordChangedAt = Date.now() - 1000;

    next();
});

// Итог:
// Данный код предоставляет полный функционал сброса пароля в приложении на Node.js и MongoDB.
// Обработчик forgotPassword генерирует токен сброса и отправляет его пользователю, а resetPassword позволяет установить новый пароль.
// Middleware обновляет поле времени изменения пароля при каждом изменении, гарантируя безопасность и актуальность данных.
