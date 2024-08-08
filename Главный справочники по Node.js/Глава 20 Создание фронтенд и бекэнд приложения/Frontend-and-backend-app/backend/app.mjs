import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
    console.log(req.body);

    const personData = {
        name: "Bogdan",
        isInstructor: true,
    };

    return res.json(personData);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
