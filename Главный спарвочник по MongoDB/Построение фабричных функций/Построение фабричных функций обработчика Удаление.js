// Глава 1: Введение в MongoDB (mongoose) - Построение фабричных функций обработчика Удаление

// В данной главе мы рассмотрим, как создать универсальную фабричную функцию для обработки удаления документов в MongoDB с использованием Mongoose.
// Функция будет принимать модель в качестве аргумента и обрабатывать запросы на удаление.

// Импортируем необходимые модули
const AppError = require('../utils/appError'); // Пользовательский класс для обработки ошибок
const catchAsync = require('../utils/catchAsync'); // Обертка для обработки асинхронных функций

// Фабричная функция для удаления документа по ID
exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
        // Ищем документ по ID и удаляем его
        const doc = await Model.findByIdAndDelete(req.params.id);

        // Если документ не найден, вызываем ошибку
        if (!doc) {
            return next(new AppError("No document found with that ID!", 404));
        }

        // Возвращаем успешный ответ с кодом 204 (No Content)
        res.status(204).json({
            status: "success",
            data: null,
        });
    });

// Пример использования фабричной функции для удаления рецензий
exports.deleteReview = exports.deleteOne(Review); // Передаем модель Review в фабричную функцию
reviewRouter.delete("/:id", reviewController.deleteReview); // Определяем маршрут для удаления рецензии

// Пример использования фабричной функции для удаления пользователей
exports.deleteUser = exports.deleteOne(User); // Передаем модель User в фабричную функцию
userRouter.delete("/:id", userController.deleteUser); // Определяем маршрут для удаления пользователя

// Итог:
// Фабричные функции позволяют создавать переиспользуемые обработчики для различных операций с документами в MongoDB.
// В данном примере мы создали функцию для удаления документа по ID, что упрощает код и делает его более структурированным.
