const express = require("express");
const { getUsersHandler, postUsersHandler, getSingleUsersHandler } = require("./controllers/users");

const router = express.Router();

router.get("/", getUsersHandler);
router.post("/", postUsersHandler);
router.get("/:userId", getSingleUsersHandler);

module.exports = router;