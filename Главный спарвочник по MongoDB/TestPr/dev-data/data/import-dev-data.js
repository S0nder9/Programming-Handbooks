const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("../../models/tourModel");

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

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log("Dara successful loaded!");
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

const deleteData = async () => {
    try {
        await Tour.deleteMany(tours);
        console.log("Dara successfully delete!");
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

if (process.argv[2] === "--import") {
    importData();
} else if (process.argv[2] === "--delete") {
    deleteData();
}

console.log(process.argv);
