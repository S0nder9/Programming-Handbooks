// Глава 1: Введение в MongoDB (mongoose) - Реализация простых вложенных маршрутов

// В этом примере мы реализуем вложенный маршрут для создания отзыва на тур.
// Мы будем использовать mongoose для создания модели отзыва (Review) и mongoose middleware для работы с базой данных MongoDB.

// Функция createReview
// Эта функция контроллера используется для создания нового отзыва.
// Если идентификаторы тура или пользователя не передаются в теле запроса, мы автоматически задаем их на основе параметров URL (req.params).

exports.createReview = catchAsync(async (req, res, next) => {
    // Задаем идентификатор тура и пользователя, если они отсутствуют в теле запроса
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.params.id;

    // Создаем новый отзыв в базе данных
    const newReview = await Review.create({
        ...req.body,
        user: req.user.id 
    });

    // Возвращаем ответ клиенту с данными нового отзыва
    res.status(201).json({
        status: "success",
        data: {
            review: newReview,
        },
    });
});

// Маршрут для создания отзыва
// Мы добавляем вложенный маршрут, чтобы пользователи могли оставлять отзывы для конкретного тура.
// Этот маршрут защищен middleware для аутентификации (authController.protect) и авторизации (authController.restrictTo("user")).

// POST запрос на адрес /:tourId/reviews будет вызывать функцию createReview
router.post(
    "/:tourId/reviews",
    authController.protect, // Защита маршрута (требуется аутентификация)
    authController.restrictTo("user"), // Ограничение маршрута только для пользователей с ролью "user"
    reviewController.createReview // Вызов функции контроллера для создания отзыва
);

// Пример запроса для создания отзыва:
// POST http://localhost:9999/api/v1/tours/6724941a3d266d3cd0c9eed5/reviews
// Тело запроса (JSON):
// {
//   "rating": 5,
//   "review": "Best review!"
// }

// Пример ответа:
// {
//   "status": "success",
//   "data": {
//     "review": {
//       "createdAt": "2024-11-02T14:09:46.851Z",
//       "tour": [
//         "6724941a3d266d3cd0c9eed5"
//       ],
//       "user": [
// "671ce6f122b6dd295403966c"
//],
//       "_id": "6726331de9531846d091fc57",
//       "rating": 5,
//       "review": "Best review!",
//       "__v": 0,
//       "id": "6726331de9531846d091fc57"
//     }
//   }
// }

// Объяснение работы маршрута:
// Этот маршрут используется для создания отзывов, привязанных к конкретному туру. При отправке POST-запроса на адрес с идентификатором тура, создается отзыв, и его данные сохраняются в базе данных MongoDB.
// Если данные (rating и review) передаются корректно, они будут добавлены в новый документ в коллекции отзывов.
