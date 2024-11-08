// Глава 1: Введение в MongoDB (mongoose)
// Импорт данных обзоров и пользователей

// В этой главе мы рассмотрим, как импортировать и удалять данные пользователей, туров и обзоров в MongoDB с использованием библиотеки mongoose.
// Мы также настроим подключение к базе данных, используя dotenv для управления переменными окружения.

// Импорт необходимых модулей
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("../../models/tourModel");   // Модель для данных туров
const User = require("../../models/userModel");   // Модель для данных пользователей
const Review = require("../../models/reviewModel"); // Модель для данных обзоров

// Загрузка переменных окружения из файла конфигурации
dotenv.config({ path: "../../config.env" });

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

// Загрузка данных из файлов JSON
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, "utf-8"));

// Функция для импорта данных в базу данных
const importData = async () => {
    try {
        await Tour.create(tours);
        await User.create(users, { validateBeforeSave: false }); // Опция отключает валидацию данных перед сохранением
        await Review.create(reviews);

        console.log("Data successfully loaded!");
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

// Функция для удаления данных из базы данных
const deleteData = async () => {
    try {
        await Tour.deleteMany(); // Удаляет все документы из коллекции Tour
        await User.deleteMany(); // Удаляет все документы из коллекции User
        await Review.deleteMany(); // Удаляет все документы из коллекции Review

        console.log("Data successfully deleted!");
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

// Проверка аргументов командной строки для вызова функций
if (process.argv[2] === "--import") {
    importData();
} else if (process.argv[2] === "--delete") {
    deleteData();
}

// Итог:
// Данный код позволяет легко импортировать или удалять данные в MongoDB.
// Используйте флаг --import для загрузки данных из файлов JSON и --delete для удаления всех данных из соответствующих коллекций.
