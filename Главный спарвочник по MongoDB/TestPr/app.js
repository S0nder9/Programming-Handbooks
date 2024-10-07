const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const tourRoutes = require("./routes/tourRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/tours", tourRoutes);

app.get("/", (req, res) => {
    res.send("Hi!");
});

app.all("*", (req, res, next) => {
    res.status(404).json({
        satus: "fail",
        message: `Can't find ${req.originalUrl} on this server!`,
    });
});

module.exports = app;
