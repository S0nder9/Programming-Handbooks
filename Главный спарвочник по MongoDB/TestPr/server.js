const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connection to the database was successful!"))
    .catch((err) => console.error("Database connection error:", err));

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name!"],
        unique: true,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price!"],
    },
});

const Tour = mongoose.model("Tour", tourSchema);

const testTour = new Tour({
    name: "The forest",
    rating: 4.7,
    price: 497,
});

testTour
    .save()
    .then((doc) => {
        console.log("Tour saved:", doc);
    })
    .catch((err) => {
        console.error("Error saving tour:", err);
    });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port: ${port}`);
});
