const express = require("express");
const commentsRouter = require("./controllers/comments");
const { getRootHandler, getUsersHandler, postUsersHandler, getSingleUsersHandler } = require("./controllers");

const port = 5000;
const app = express();

app.get("/", getRootHandler);
app.get("/users", getUsersHandler);
app.post("/users", postUsersHandler);
app.get("/users/:userId", getSingleUsersHandler);
app.use("/comments", commentsRouter);

app.use("/", (req, res) => {
    res.send("~!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
