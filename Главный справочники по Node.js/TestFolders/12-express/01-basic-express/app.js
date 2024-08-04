const express = require("express");

const port = 5000;
const app = express();

app.get("/", (req, res) => {
    res.send("~!");
});

app.use("/", (req, res) => {
    res.send("~!");
});

app.listen(port);