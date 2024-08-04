const express = require("express");

const port = 5000;
const app = express();
const firstHandler = (req, res, next) => {
    console.log("1");
    
    next();
}

const secondHandler = (req, res) => {res.send("secondHandler");};


app.get("/", firstHandler, secondHandler);

app.use("/", (req, res) => {
    res.send("~!");
});

app.listen(port);