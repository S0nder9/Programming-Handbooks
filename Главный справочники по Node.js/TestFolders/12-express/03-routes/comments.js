const express = require("express");
const { getCommentsHandler, postCommentsHandler, getCommentHandler, deleteCommentHandler } = require("./controllers/comments");

const router = express.Router();

router.get("/", getCommentsHandler);
router.post("/", postCommentsHandler);
router.get("/:commentId", getCommentHandler);
router.delete("/:commentId", deleteCommentHandler);

module.exports = router;
