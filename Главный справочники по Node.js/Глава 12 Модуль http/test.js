const https = require("https");

const url = "https://jsonplaceholder.typicode.com/todos/1";

https.get(url, (res) => {
    let responseBody = "";

    res.on("data", (chunk) => {
        responseBody += chunk;
    });
    
    res.on("end", () => {
        console.log(responseBody);
    });
})