// Глава 1: Введение в MongoDB - Добавление ошибок 404 Not Found

// В работе с MongoDB важно правильно обрабатывать ошибки, такие как отсутствие запрашиваемого ресурса.
// В этом примере мы рассмотрим, как добавить обработку ошибки 404 Not Found при запросе тура по его ID.

// Пример контроллера для получения тура по ID:
exports.getTour = catchAsync(async (req, res, next) => {
    // Пытаемся найти тур в базе данных по ID, переданному в параметрах запроса
    const tour = await Tour.findById(req.params.id);

    // Если тур не найден, возвращаем ошибку 404
    if (!tour) {
        // Создаем новую ошибку с сообщением "Tour not found" и статусом 404
        return next(new AppError("Tour not found", 404));
    }

    // Если тур найден, возвращаем его данные с кодом 200 (успешный запрос)
    res.status(200).json({
        status: "success",
        data: {
            tour,
        },
    });
});

// Объяснение кода:
// 1. Мы используем асинхронную функцию, чтобы выполнить запрос к базе данных с помощью await.
// 2. Если тур не найден, создается экземпляр класса AppError с сообщением "Tour not found" и статусом 404.
//    - Эта ошибка передается следующей функции обработки ошибок (next).
//    - AppError — это пользовательский класс ошибки, который позволяет нам централизованно обрабатывать ошибки в приложении.
// 3. Если тур найден, возвращаем ответ с кодом 200 и передаем данные тура в формате JSON.

// Обработка ошибки 404 Not Found помогает нам предоставить пользователю более информативный ответ, если запрашиваемый ресурс не существует.
