const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const AppError = require("./utils/appError.js");

const tourRoutes = require("./routes/tourRoutes");
const globalErrorHandler = require("./controllers/errorController.js");

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
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
