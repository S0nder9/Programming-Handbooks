const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
    console.log(`ERROR: \n${err.name}, ${err.message}`);
    console.log("uncaught Exception! Shutting");
    process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

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

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`App running on port: ${port}`);
});

process.on("unhandledRejection", (err) => {
    console.log("unhandled Rejection! Shutting");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

