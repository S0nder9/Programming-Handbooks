const express = require("express");
const authController = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.get("/", reviewController.getAllReviews);
reviewRouter.post(
    "/",
    authController.protect,
    authController.restrictTo("user"),
    reviewController.setTourUserIds,
    reviewController.createReview
);

reviewRouter.post(
    "/createReview",
    authController.protect,
    authController.restrictTo("user"),
    reviewController.createReview
);

reviewRouter.delete("/:id", reviewController.deleteReview);
reviewRouter.patch("/:id", reviewController.updateReview);
reviewRouter.get("/:id", reviewController.getReview);

module.exports = reviewRouter;
