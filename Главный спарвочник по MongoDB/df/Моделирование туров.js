// Глава 1: Введение в MongoDB - Моделирование туров

// MongoDB является одной из самых популярных NoSQL баз данных, широко используемой для работы с большими объемами данных, неструктурированными или слабо структурированными данными.
// В этой главе мы рассмотрим, как создавать модели для данных с использованием Mongoose — библиотеки для работы с MongoDB в Node.js.

// В этом примере мы создаем модель для туристических туров (экскурсий), используя Mongoose.

// Импортируем Mongoose
const mongoose = require("mongoose");

// Создаем схему для модели тура
// Схема определяет структуру документа в коллекции MongoDB, включая типы данных, требования и дефолтные значения.
const tourSchema = new mongoose.Schema({
    // Название тура
    name: {
        type: String, // Тип данных — строка
        required: [true, "A tour must have a name!"], // Обязательное поле с сообщением об ошибке, если оно отсутствует
        unique: true, // Уникальное значение — названия туров не могут повторяться
        trim: true, // Обрезка пробелов в начале и в конце строки
    },
    // Длительность тура в днях
    duration: {
        type: Number, // Тип данных — число
        required: [true, "A tour must have a duration!"], // Обязательное поле
    },
    // Максимальный размер группы
    maxGroupSize: {
        type: Number,
        required: [true, "A tour must have a group size!"],
    },
    // Сложность тура (например, "легкий", "средний", "сложный")
    difficulty: {
        type: String,
        required: [true, "A tour must have a difficulty!"],
    },
    // Средний рейтинг тура
    raitingsAverage: {
        type: Number,
        default: 0, // Значение по умолчанию
    },
    // Количество оценок
    raitingsQuantity: {
        type: Number,
        default: 0,
    },
    // Общий рейтинг
    rating: {
        type: Number,
        default: 4.5, // Значение по умолчанию — средний рейтинг 4.5
    },
    // Цена тура
    price: {
        type: Number,
        required: [true, "A tour must have a price!"], // Обязательное поле
    },
    // Скидка на тур
    priceDiscount: {
        type: Number,
    },
    // Краткое описание тура
    summary: {
        type: String,
        trim: true, // Обрезка пробелов
        required: [true, "A tour must have a description!"], // Обязательное поле
    },
    // Полное описание тура
    description: {
        type: String,
        trim: true, // Обрезка пробелов
    },
    // Изображение обложки тура
    imageCover: {
        type: String,
        trim: true,
        required: [true, "A tour must have a cover image!"], // Обязательное поле
    },
    // Дополнительные изображения тура
    images: [String], // Массив строк, содержащий URL изображений
    // Дата создания тура
    createdAt: {
        type: Date,
        default: Date.now(), // По умолчанию — текущая дата
    },
    // Даты начала тура
    startDates: [Date], // Массив дат
});

// Создаем модель на основе схемы
// Модель представляет собой интерфейс для взаимодействия с документами MongoDB. Мы используем схему для создания модели 'Tour'.
const Tour = mongoose.model("Tour", tourSchema);

// Экспортируем модель для использования в других частях приложения
module.exports = Tour;

// Описание модели:
// Эта модель представляет данные о турах, включая такие свойства, как название тура, его длительность, максимальный размер группы, сложность, рейтинг, цену, описание, изображения и даты начала.
// Mongoose предоставляет удобный API для валидации данных и работы с базой данных MongoDB.
