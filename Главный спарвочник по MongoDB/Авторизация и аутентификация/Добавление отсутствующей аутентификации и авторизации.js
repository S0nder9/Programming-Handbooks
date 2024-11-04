// Глава 1: Введение в MongoDB (mongoose)
// Подглава: Добавление отсутствующей аутентификации и авторизации

// В этом примере кода используется `express` и `mongoose`, а также модули для аутентификации и авторизации пользователей.
// Мы добавляем защиту маршрутов с использованием JWT (JSON Web Token) для обеспечения безопасности и доступа только авторизованных пользователей.
// Это пример структуры для настройки аутентификации и авторизации в Node.js с использованием контроллеров и роутеров.

// Подключение необходимых модулей
const express = require("express");
const authController = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");
const userController = require("../controllers/userController");
const tourController = require("../controllers/tourController");

// Настройка роутера для отзывов (reviews)
const reviewRouter = express.Router({ mergeParams: true });

// Защита всех маршрутов отзывов с использованием middleware, требующего авторизации
reviewRouter.use(authController.protect);

// Определение маршрутов для управления отзывами
reviewRouter
    .route("/")
    .get(reviewController.getAllReviews)
    .post(
        authController.restrictTo("user"), // Ограничение доступа к маршруту создания отзыва только для пользователей с ролью "user"
        reviewController.setTourUserIds,
        reviewController.createReview
    );

reviewRouter
    .route("/:id")
    .get(reviewController.getReview)
    .delete(
        authController.restrictTo("user", "admin"), // Ограничение доступа для удаления отзыва только для пользователей с ролями "user" и "admin"
        reviewController.deleteReview
    )
    .patch(
        authController.restrictTo("user", "admin"), // Ограничение доступа для обновления отзыва только для пользователей с ролями "user" и "admin"
        reviewController.updateReview
    );

module.exports = reviewRouter;

// Настройка роутера для управления пользователями (users)
const userRouter = express.Router();

// Маршруты для аутентификации (регистрация, вход, сброс пароля)
userRouter.post("/signup", authController.signup);
userRouter.post("/login", authController.login);
userRouter.post("/forgotPassword", authController.forgotPassword);
userRouter.patch("/resetPassword/:token", authController.resetPassword);

// Защита всех последующих маршрутов с использованием middleware, требующего авторизации
userRouter.use(authController.protect);

// Маршруты для обновления пароля и управления учетной записью
userRouter.patch("/updateMyPassword", authController.updatePassword);
userRouter.get("/me", userController.getMe, userController.getUser);
userRouter.patch("/updateMe", userController.updateMe);
userRouter.delete("/deleteMe", userController.deleteMe);

// Ограничение доступа к последующим маршрутам только для пользователей с ролью "admin"
userRouter.use(authController.restrictTo("admin"));

// Маршруты для управления пользователями (доступ только для администратора)
userRouter
    .route("/:id")
    .delete(userController.deleteUser)
    .patch(userController.updateUser)
    .get(userController.getUser);

userRouter
    .route("/")
    .get(userController.getAllUsers)
    .post(userController.createUser);

module.exports = userRouter;

// Настройка роутера для управления турами (tours)
const router = express.Router();

// Определение маршрутов для получения статистики и планов туров с проверкой прав
router.get("/tour-stats", tourController.getTourStats);
router.get(
    "/monthly-plan/:year",
    authController.protect,
    authController.restrictTo("admin", "lead-guide", "guide"), // Доступ только для определенных ролей
    tourController.getMonthlyPlay
);

// Основные маршруты для управления турами
router
    .route("/")
    .get(tourController.getAllTours)
    .post(
        authController.protect,
        authController.restrictTo("admin", "lead-guide"), // Создание тура доступно только для ролей "admin" и "lead-guide"
        tourController.createTour
    );

router
    .route("/:id")
    .get(tourController.getTour)
    .patch(
        authController.protect,
        authController.restrictTo("admin", "lead-guide"), // Обновление тура доступно только для ролей "admin" и "lead-guide"
        tourController.updateTour
    )
    .delete(
        authController.protect,
        authController.restrictTo("admin", "lead-guide"), // Удаление тура доступно только для ролей "admin" и "lead-guide"
        tourController.deleteTour
    );

// Дополнительный маршрут для получения топ-5 дешевых туров
router.get(
    "/top-5-cheap",
    tourController.aliasTopTour,
    tourController.getAllTours
);

// Вложенный роутер для отзывов (связь между турами и отзывами)
router.use("/:tourId/reviews", reviewRouter);

module.exports = router;

// Итог:
// Мы настроили базовую защиту маршрутов, позволяющую контролировать доступ к различным функциям и данным на основе ролей пользователей.
// Использование middleware для аутентификации и авторизации помогает изолировать и управлять доступом к различным маршрутам.
// Этот подход повышает безопасность приложения и упрощает управление правами доступа.
