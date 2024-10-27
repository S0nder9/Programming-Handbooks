// Глава 1: Введение в MongoDB - Отправка писем с помощью Nodemailer
// В этой главе мы рассмотрим, как настроить отправку писем с помощью Nodemailer, используя MongoDB для хранения пользователей, и как организовать процесс сброса пароля.

// Подключаем Nodemailer для отправки писем:
const nodemailer = require("nodemailer");

// Функция sendEmail для отправки email
const sendEmail = async (options) => {
    // Создаем транспортер для отправки письма, используя данные из переменных окружения
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST, // хост почтового сервиса
        port: process.env.EMAIL_PORT, // порт сервера
        auth: {
            user: process.env.EMAIL_USERNAME, // имя пользователя для авторизации
            pass: process.env.EMAIL_PASSWORD, // пароль для авторизации
        },
    });

    // Опции для отправляемого письма
    const mailOptions = {
        from: "Jonas Main <hi@gmail.com>", // отправитель
        to: options.email, // получатель
        subject: options.subject, // тема письма
        text: options.message, // тело письма
        // html: можно добавить HTML-контент для более сложных писем
    };

    // Отправляем письмо
    await transporter.sendMail(mailOptions);
};

// Экспортируем функцию для использования в других модулях
module.exports = sendEmail;

// Использование маршрута для сброса пароля
// В данном случае, пользователи могут запросить сброс пароля, и им на почту отправится специальная ссылка для этого
userRouter.patch("/resetPassword/:token", authController.resetPassword);

// Контроллер forgotPassword для обработки запроса на сброс пароля
exports.forgotPassword = catchAsync(async (req, res, next) => {
    // Находим пользователя по email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new AppError("There is no user with that email address!", 404));
    }

    // Генерируем токен для сброса пароля
    const resetToken = user.createPasswordResetToken();

    // Сохраняем пользователя без проверки валидации (чтобы токен и срок действия записались в базу)
    await user.save({ validateBeforeSave: false });

    // Генерируем URL для сброса пароля
    const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;

    // Формируем сообщение, которое будет отправлено по почте
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    try {
        // Отправляем письмо пользователю
        await sendEmail({
            email: user.email,
            subject: "Your password reset token (valid for 10 min)",
            message,
        });

        // Отправляем успешный ответ
        res.status(200).json({
            status: "success",
            message: "Token sent to email",
        });
    } catch (error) {
        // В случае ошибки удаляем токен и срок его действия из базы данных
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save({ validateBeforeSave: false });

        // Возвращаем ошибку, если не удалось отправить письмо
        return next(new AppError("There was an error when sending the email, please try again later!", 500));
    }
});

// Итог:
// В этом примере мы реализовали отправку письма с использованием Nodemailer и MongoDB.
// Пользователь может запросить сброс пароля, и при этом генерируется уникальный токен для восстановления, который отправляется на указанный email.
// Мы также добавили обработку ошибок на случай, если отправка письма не удалась.
