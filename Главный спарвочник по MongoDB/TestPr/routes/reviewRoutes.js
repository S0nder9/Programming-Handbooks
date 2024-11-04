const express = require("express");
const authController = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.use(authController.protect);

reviewRouter
    .route("/")
    .get(reviewController.getAllReviews)
    .post(
        authController.restrictTo("user"),
        reviewController.setTourUserIds,
        reviewController.createReview
    );

reviewRouter.post("/createReview", reviewController.createReview);

reviewRouter
    .route("/id")
    .get(reviewController.getReview)
    .delete(
        authController.restrictTo("user", "admin"),
        reviewController.deleteReview
    )
    .patch(
        authController.restrictTo("user", "admin"),
        reviewController.updateReview
    );

module.exports = reviewRouter;
