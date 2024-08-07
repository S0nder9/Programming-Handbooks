import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("tiny"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.body);

    return res.send("1");
});

app.listen(5000);
