const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const AppError = require("./utils/appError.js");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const globalErrorHandler = require("./controllers/errorController.js");
const userRouter = require("./routes/userRoutes.js");
const tourRoutes = require("./routes/tourRoutes.js");
const reviewRouter = require("./routes/reviewRoutes.js");

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

const limiter = rateLimit({
    max: process.env.NUMBER_OF_REQUESTS_ON_THE_SAME_IP_IN_ONE_HOUR || 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many request from this IP, pleas try again in an hour!",
});

app.use("/api/", limiter);

app.use(
    express.json({
        limit: process.env.LIMIT_JSON_SIZE || "10kb",
    })
);

app.use(mongoSanitize());
app.use(xss());
app.use(
    hpp({
        whitelist: process.env.WHITELIST_FOR_SEARCH.split(","),
    })
);


app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

app.get("/", (req, res) => {
    res.send("Hi!");
});

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
