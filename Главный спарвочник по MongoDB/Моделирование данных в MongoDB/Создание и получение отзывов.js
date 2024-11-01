// Глава 1: Введение в MongoDB (mongoose) - Создание и получение отзывов

// В этой главе мы создаем API для работы с отзывами, включая создание и получение всех отзывов с помощью MongoDB и Mongoose.
// Мы также добавляем защиту и ограничения, чтобы только авторизованные пользователи могли создавать отзывы.

// Модель Review
// Модель `Review` представляет отзыв, который пользователь может создать и затем сохранить в базе данных MongoDB.

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, "Отзыв не может быть пустым"],
    },
    rating: {
        type: Number,
        required: [true, "Отзыв должен содержать оценку"],
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tour: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Tour",
            required: [true, "Review must belong to a tour!"],
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Отзыв должен принадлежать пользователю"],
    },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

// Контроллеры для работы с отзывами
// Используем два контроллера: `getAllReviews` для получения всех отзывов и `createReview` для создания нового отзыва.

const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");

// Получение всех отзывов
exports.getAllReviews = catchAsync(async (req, res, next) => {
    const reviews = await Review.find();

    res.status(200).json({
        status: "success",
        results: reviews.length,
        data: {
            reviews,
        },
    });
});

// Создание нового отзыва
exports.createReview = catchAsync(async (req, res, next) => {
    const newReview = await Review.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            review: newReview,
        },
    });
});

// Настройка маршрутизации для отзывов
// Мы используем маршруты для доступа к методам API, добавляя защиту для создания отзывов.

const express = require("express");
const authController = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");

const reviewRouter = express.Router();

// Маршрут для получения всех отзывов
reviewRouter.get("/", reviewController.getAllReviews);

// Маршрут для создания нового отзыва
// Этот маршрут защищен, чтобы только авторизованные пользователи с ролью "user" могли создавать отзывы.
reviewRouter.post(
    "/createReview",
    authController.protect,
    authController.restrictTo("user"),
    reviewController.createReview
);

module.exports = reviewRouter;

// Подключение маршрутов отзывов в основном приложении Express
const express = require("express");
const app = express();

app.use("/api/v1/reviews", reviewRouter);

// Итог:
// Мы создали API для управления отзывами, включая маршруты для получения и создания отзывов.
// В контроллере добавлена защита для создания отзыва, чтобы доступ к этому ресурсу был ограничен только авторизованным пользователям.
