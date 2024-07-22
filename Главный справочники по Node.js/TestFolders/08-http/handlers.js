const comments = require("./data");
const qs = require("querystring");
const fs = require("fs");

// const htmlUrl = "./Files/comment-form.html";
const htmlUrl = "c:/Users/npatr/Documents/GitHub/Programming-Handbooks/Главный справочники по Node.js/TestFolders/08-http/commentForm.html";


const getHome = (req, res) => {
    fs.readFile(htmlUrl, (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/plain");
            res.end("Error reading file: " + err.message);
            return;
        }

        if (req.method === "POST" && req.headers["content-type"] === "application/x-www-form-urlencoded") {
            let body = "";
            req.on("data", chunk => {
                body += chunk.toString();
            });

            req.on("end", () => {
                try {
                    const comment = qs.parse(body);
                    comments.push(comment);
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "text/html");
                    res.write("<a href = "/">Submit</a>");
                    res.end(data);
                } catch (err) {
                    res.statusCode = 400;
                    res.end("Error parsing form data: " + err.message);
                }
            });
        } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        }
    });
};

const getHtml = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html><body><div>");
    res.write("<h1>Test!</h1>");
    res.write("</html></body></div>");
    res.end();
};

const getText = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("This is plain text!");
};

const getComments = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(comments));
};

const handleNotFound = (req, res) => {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Page not found!</h1>");
};

const postComment = (req, res) => {
    res.setHeader("Content-Type", "application/json");

    if (req.headers["content-type"] === "application/json") {
        let commentJSON = "";

        req.on("data", (chunk) => {
            commentJSON += chunk;
        });

        req.on("end", () => {
            try {
                const comment = JSON.parse(commentJSON);
                comments.push(comment);
                res.statusCode = 200;
                res.end(JSON.stringify({ message: "Comment posted successfully!" }));
            } catch (error) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "Invalid JSON format: " + error.message }));
            }
        });
    } else {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Content-Type must be application/json" }));
    }
};

module.exports = {
    getHtml,
    getText,
    getComments,
    handleNotFound,
    postComment,
    getHome,
};
