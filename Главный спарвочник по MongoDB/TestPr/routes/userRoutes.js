const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/signup", authController.signup);
userRouter.post("/login", authController.login);
userRouter.post("/forgotPassword", authController.forgotPassword);
userRouter.patch("/resetPassword/:token", authController.resetPassword);

//
userRouter.use(authController.protect);

userRouter.patch(
    "/updateMyPassword",
    authController.updatePassword
);

userRouter.get("/me", userController.getMe, userController.getUser);

userRouter.patch("/updateMe", userController.updateMe);
userRouter.delete("/deleteMe", userController.deleteMe);

//
userRouter.use(authController.restrictTo("admin"));

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
