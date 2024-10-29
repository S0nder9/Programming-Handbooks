// Глава 1: Введение в MongoDB - Обновление пароля текущего пользователя

// Этот пример демонстрирует, как можно обновить пароль текущего пользователя с использованием MongoDB и Express.js.
// Он включает проверку текущего пароля пользователя, обновление его на новый, сохранение изменений и отправку нового JWT токена.

// Функция для обновления пароля
exports.updatePassword = catchAsync(async (req, res, next) => {
    // Находим пользователя по его ID и загружаем его пароль в память
    const user = await User.findById(req.user.id).select("+password");

    // Проверяем, совпадает ли введенный текущий пароль с паролем пользователя
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError("Ваш текущий пароль неверен!", 401));
    }

    // Обновляем пароль пользователя, задавая новый пароль и подтверждение пароля
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    // Сохраняем изменения
    await user.save();

    // Отправляем обновленный токен для нового сеанса
    createSendToken(user, 200, res);
});

// Функция для создания токена
const signToken = (id) => {
    // Генерация JWT токена с ID пользователя, секретом и временем жизни токена
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

// Определение маршрута для обновления пароля
userRouter.patch(
    "/updateMyPassword",
    authController.protect, // Middleware для проверки доступа пользователя
    authController.updatePassword // Метод для обновления пароля
);
