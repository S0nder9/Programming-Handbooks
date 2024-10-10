// Глава 1: Введение в MongoDB - Обработка неверных идентификаторов баз данных

// В процессе работы с MongoDB может возникать ошибка "CastError", если в запросе передается некорректный идентификатор для поиска в базе данных.
// Для обработки таких ошибок и возврата пользователю понятного сообщения можно использовать специальную функцию для обработки ошибок и централизованный обработчик ошибок.
// В данном примере используется класс AppError для создания кастомных ошибок и две функции для отправки ошибок в зависимости от среды (development или production).

// Импорт класса AppError
const AppError = require("../utils/appError");

// Функция для обработки CastError
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

// Функция для отправки ошибки в режиме разработки (development)
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

// Функция для отправки ошибки в режиме продакшн (production)
const sendErrorProd = (err, res) => {
    // Если ошибка является операционной, отправляем детальное сообщение
    if (err.isOperation) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        // Логируем ошибку для разработчиков
        console.error("ERROR!", err);

        // Отправляем общее сообщение пользователю
        res.status(500).json({
            status: "error",
            message: "Something went wrong!",
        });
    }
};

// Централизованный обработчик ошибок
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; // Устанавливаем статус код по умолчанию
    err.status = err.status || "error"; // Устанавливаем статус ошибки

    // Проверяем среду выполнения (development или production)
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === "production") {
        // Создаем копию ошибки для дальнейшей обработки
        let error = { ...err };
        
        // Если ошибка типа "CastError", вызываем функцию для ее обработки
        if (error.name === "CastError") {
            error = handleCastErrorDB(error);
        }

        // Отправляем обработанную ошибку
        sendErrorProd(error, res);
    }
};

// Итог:
// Данный код помогает централизованно обрабатывать ошибки, возникающие при работе с базой данных MongoDB, и корректно реагировать на некорректные идентификаторы.
// В режиме разработки пользователю показываются все детали ошибки, чтобы упростить отладку, а в режиме продакшн показывается общее сообщение для обеспечения безопасности.
