const express = require("express");
const authController = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");

const reviewRouter = express.Router();

reviewRouter.get("/", reviewController.getAllReviews);
reviewRouter.post(
    "/createReview",
    authController.protect,
    authController.restrictTo("user"),
    reviewController.createReview
);

module.exports = reviewRouter;
