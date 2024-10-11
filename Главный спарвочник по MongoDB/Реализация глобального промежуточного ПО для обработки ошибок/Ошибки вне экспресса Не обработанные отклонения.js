// Глава 1: Введение в MongoDB - Ошибки вне Express: Не обработанные отклонения

// При использовании MongoDB с Node.js и Express могут возникать ошибки, связанные с подключением к базе данных или другими асинхронными операциями, которые не были корректно обработаны.
// В этой главе мы рассмотрим, как управлять такими ошибками и предотвращать неконтролируемое завершение работы приложения.

// Подключение к базе данных и обработка ошибок
// Когда мы подключаемся к базе данных MongoDB с помощью библиотеки mongoose, важно обрабатывать возможные ошибки подключения.
// В коде ниже используется конфигурация для подключения к базе данных и обработка ошибок при подключении:

const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Настройка переменных окружения
dotenv.config({ path: "./config.env" });
const app = require("./app");

// Подключение к базе данных MongoDB
const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connection to the database was successful!"))
    .catch((err) => console.error("Database connection error:", err));

// Запуск сервера
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port: ${port}`);
});

// Обработка необработанных отклонений (unhandledRejection)
// Если возникают ошибки вне Express, такие как необработанные Promise-отклонения, важно управлять ими корректно, чтобы приложение не завершалось неконтролируемо.
// В коде ниже обработка таких ошибок производится с помощью события process.on("unhandledRejection"):
process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("Unhandled rejection detected! Shutting down the server...");

    // Корректное завершение работы сервера
    server.close(() => {
        process.exit(1); // Завершение процесса с кодом ошибки
    });
});

// Итог:
// Обработка необработанных отклонений (unhandledRejection) позволяет предотвратить неконтролируемое завершение приложения и корректно закрывать сервер, когда возникают ошибки.
// Это важно для обеспечения надежности и стабильности вашего Node.js-приложения с использованием MongoDB.
