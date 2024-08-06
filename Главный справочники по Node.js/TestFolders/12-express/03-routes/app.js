const express = require("express");
const router = require("./index");

const port = 5000;
const app = express();

app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
