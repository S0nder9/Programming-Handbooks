import fs from "fs";
import http from "http";

const server = http.createServer((req, res)  => {
    const filePath = "./index.html";

    if (req.url === "/" && req.method === "GET") {
        const readStream = fs.createReadStream(filePath);
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        readStream.pipe(res)
    }

    if (req.url === "/no-stream" && req.method === "GET") {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end(err);
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/html");
                res.end(data);
            }

        })
    }
})

server.listen(5000, () => {
    console.log("http://localhost:5000");
})