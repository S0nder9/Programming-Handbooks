const AppError = require("../utils/appError.js");

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    const value = err.keyValue ? Object.values(err.keyValue)[0] : "unknown value";
    const message = `Duplicate field value: ${value}. Please use a different value.`;

    return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((data) => data.message);
    const message = `Invalid input data. ${errors.join(". ")}`;

    return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.error("ERROR!", err);

        res.status(500).json({
            status: "error",
            message: "Something went wrong!",
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    let error = { ...err, message: err.message, name: err.name, code: err.code };

    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === "production") {
        if (error.name === "CastError") {
            error = handleCastErrorDB(error);
        }

        if (error.code === 11000) {
            error = handleDuplicateFieldsDB(error);
        }

        if (error.name === "ValidationError") {
            error = handleValidationErrorDB(error);
        }

        sendErrorProd(error, res);
    }
};
