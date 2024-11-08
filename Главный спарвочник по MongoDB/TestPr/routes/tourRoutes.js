const express = require("express");
const tourController = require("../controllers/tourController");
const authController = require("../controllers/authController");
const reviewRouter = require("../routes/reviewRoutes");

const router = express.Router();

router.get("/tour-stats", tourController.getTourStats);
router.get(
    "/monthly-plan/:year",
    authController.protect,
    authController.restrictTo("admin", "lead-guide", "guide"),
    tourController.getMonthlyPlay
);

router
    .route("/tour-within/:distance/center/:latlng/unit/:unit")
    .get(tourController.getToursWithin);

router
    .route("/distances/:latlng/unit/:unit")
    .get(tourController.getDistances);

router
    .route("/")
    .get(tourController.getAllTours)
    .post(
        authController.protect,
        authController.restrictTo("admin", "lead-guide"),
        tourController.createTour
    );

router
    .route("/:id")
    .get(tourController.getTour)
    .patch(
        authController.protect,
        authController.restrictTo("admin", "lead-guide"),
        tourController.updateTour
    )
    .delete(
        authController.protect,
        authController.restrictTo("admin", "lead-guide"),
        tourController.deleteTour
    );

router.get(
    "/top-5-cheap",
    tourController.aliasTopTour,
    tourController.getAllTours
);

router.use("/:tourId/reviews", reviewRouter);

module.exports = router;
