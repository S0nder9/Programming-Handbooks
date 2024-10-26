const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);
userRouter.post("/signup", authController.signup);
userRouter.post("/login", authController.login);

userRouter.post("/forgotPassword", authController.forgotPassword);
userRouter.post("/resetPassword", authController.resetPassword);

module.exports = userRouter;
