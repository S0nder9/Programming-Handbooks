const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const tourRoutes = require("./routes/tourRoutes");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/tours", tourRoutes);

app.get("/", (req, res) => {
    res.send("Hi!");
});

module.exports = app;
