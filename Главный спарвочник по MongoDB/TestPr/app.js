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
app.get("/api/v1/tours", tourController.getAllTours); 
app.get("/api/v1/tours/:id", tourController.getTour);
app.patch("/api/v1/tours/:id", tourController.updateTour);
app.delete("/api/v1/tours/:id", tourController.deleteTour);

app.get("/", (req, res) => {
    res.send("Hi!");
});

module.exports = app;
