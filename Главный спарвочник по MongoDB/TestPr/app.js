const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const tourController = require("./controllers/tourController");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/tours", tourController.createTour); 

app.get("/", (req, res) => {
    res.send("Hi!");
});

module.exports = app;
