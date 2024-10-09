// Глава 1: Введение в MongoDB
// Реализация глобального промежуточного ПО для обработки ошибок

// В этой главе мы рассмотрим, как реализовать глобальное промежуточное ПО для обработки ошибок в Node.js
// и как это связано с использованием MongoDB в вашем приложении.

// Промежуточное ПО для обработки ошибок необходимо для корректной обработки ошибок и предоставления
// структурированных ответов в случае, если что-то пошло не так.
// Это особенно важно в приложениях, работающих с базой данных MongoDB, где ошибки могут возникать при запросах к базе данных.

// 1. Реализация глобального промежуточного ПО для обработки ошибок:
// В Express.js мы можем создать глобальное промежуточное ПО для обработки ошибок, которое будет перехватывать ошибки
// и отправлять корректный ответ клиенту.

// Пример промежуточного ПО, которое перехватывает все несуществующие маршруты и вызывает ошибку:
app.all("*", (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.status = "fail";
    err.statusCode = 404;

    next(err); // Передаем ошибку в следующий обработчик ошибок
});

// 2. Глобальный обработчик ошибок:
// После того как мы создали промежуточное ПО для перехвата ошибок маршрутов, необходимо реализовать
// глобальный обработчик, который будет отвечать на все виды ошибок, включая ошибки базы данных.

// Пример глобального обработчика ошибок:
app.use((err, req, res, next) => {
    // Устанавливаем код состояния ошибки, если он не был задан
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    // Отправляем ответ с кодом состояния и сообщением об ошибке
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

// 3. Почему это важно при работе с MongoDB:
// Когда вы работаете с MongoDB, ошибки могут возникать при выполнении операций с базой данных, таких как
// добавление, обновление или удаление документов. Эти ошибки также должны корректно обрабатываться и отправляться
// в виде структурированного ответа клиенту.

// Пример обработки ошибки MongoDB в глобальном обработчике:
app.use((err, req, res, next) => {
    if (err.name === 'MongoError') {
        err.statusCode = 500;
        err.message = 'Database error occurred';
    }

    // Отправляем ответ с обновленной информацией об ошибке
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

// Итог:
// Реализация глобального промежуточного ПО и обработчика ошибок в приложении Express.js обеспечивает
// единообразную обработку всех возможных ошибок, включая ошибки MongoDB.
// Это позволяет поддерживать стабильность приложения и предоставлять пользователям полезные сообщения об ошибках.
