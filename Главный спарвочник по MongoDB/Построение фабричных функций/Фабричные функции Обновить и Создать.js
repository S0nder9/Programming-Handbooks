// Глава 1: Введение в MongoDB (mongoose) - Фабричные функции Обновить и Создать

// В этом разделе мы рассмотрим, как создавать и обновлять документы в MongoDB с использованием Mongoose.
// Mongoose предоставляет удобный API для работы с MongoDB, а также поддерживает схему данных и валидацию.

// Пример кода для создания, обновления и удаления документов с использованием фабричных функций:

const AppError = require("./appError");
const catchAsync = require("./catchAsync");

// Функция для обновления документа по ID
exports.updateOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Возвращаем обновленный документ
            runValidators: true, // Запускаем валидацию схемы
        });

        if (!doc) {
            return next(new AppError("No document found with that ID!", 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });

// Функция для создания нового документа
exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.create({
            ...req.body,
            user: req.user.id, // Сохранение ID пользователя, если необходимо
        });
        res.status(201).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });

// Итог:
// Эти фабричные функции обеспечивают простоту и удобство работы с документами в MongoDB через Mongoose.
// Они позволяют эффективно обрабатывать операции создания и обновления, используя принципы асинхронного программирования и обработку ошибок.
