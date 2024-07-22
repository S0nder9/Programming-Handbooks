const http = require("http");
const { getHtml, getComments, getText, handleNotFound, postComment, getHome } = require("./handlers");

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/html") {
        return getHtml(req, res);
    }

    if (req.method === "GET" && req.url === "/text") {
        getText(req, res);
    }

    if (req.method === "GET" && req.url === "/comments") {
        getComments(req, res);
    }

    if (req.method === "POST" && req.url === "/comments") {
        return postComment(req, res);
    }

    if (req.method === "GET" && req.url === "/") {
        return getHome(req, res);
    }

    handleNotFound(req, res);
});

server.listen(3000, () => {
    console.log("http://localhost:3000/");
});
