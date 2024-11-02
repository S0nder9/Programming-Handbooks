const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.delete(
    "/:id",
    authController.protect,
    authController.restrictTo("admin"),
    userController.deleteUser
);
userRouter.get("/", userController.getAllUsers);
userRouter.post("/signup", authController.signup);
userRouter.post("/login", authController.login);

userRouter.post("/forgotPassword", authController.forgotPassword);
userRouter.patch("/resetPassword/:token", authController.resetPassword);
userRouter.patch(
    "/updateMyPassword",
    authController.protect,
    authController.updatePassword
);

userRouter.patch("/updateMe", authController.protect, userController.updateMe);
userRouter.delete("/deleteMe", authController.protect, userController.deleteMe);


module.exports = userRouter;
