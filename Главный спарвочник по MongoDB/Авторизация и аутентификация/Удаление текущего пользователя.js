// Глава 1: Введение в MongoDB - Удаление текущего пользователя

// В этом примере рассматривается, как деактивировать (вместо полного удаления) текущего пользователя в базе данных MongoDB.
// Этот подход делает аккаунт пользователя неактивным, помечая его как "active: false" и исключая из выборок, вместо того, чтобы полностью удалять из базы данных.

// Функция deleteMe:
// Метод `deleteMe` устанавливает флаг `active` на `false` для текущего пользователя, деактивируя его учетную запись.
// Такой подход позволяет легко восстановить учетную запись в будущем, если это потребуется.

// Определение метода deleteMe в контроллере пользователя:
exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false }); // устанавливает `active: false` для текущего пользователя

    res.status(204).json({
        status: "success",
        data: null, // возвращает пустой объект данных, указывая, что действие успешно завершено
    });
});

// Middleware для исключения неактивных пользователей:
// Используем middleware перед каждым запросом `find`, чтобы исключить пользователей с `active: false` из выборки.
// Метод `pre` в схеме пользователя автоматически добавляет условие к каждому запросу, проверяющему активность.
userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } }); // исключает пользователей с `active: false` из выборки
    next();
});

// Настройка маршрута:
// Маршрут `/deleteMe` связан с контроллером deleteMe, используя `authController.protect` для защиты маршрута, чтобы только аутентифицированные пользователи могли деактивировать свои учетные записи.
userRouter.delete("/deleteMe", authController.protect, userController.deleteMe);

// Итог:
// Метод deleteMe — это практичный подход для мягкого удаления пользователей, что позволяет сохранить их учетные данные для будущего восстановления.
// Используя middleware для исключения неактивных пользователей, вы можете быть уверены, что они не будут отображаться в запросах выборки.
