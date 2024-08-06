const express = require("express");
const { getRootHandler } = require("./controllers/root");
const commentsRouter = require("./controllers/comments");
const userRouter = require("./controllers/users");

const router = express.Router();

router.get("/", getRootHandler);
router.use("/comments", commentsRouter);
router.use("/users", userRouter);

module.exports = router;