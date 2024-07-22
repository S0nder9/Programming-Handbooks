const fs = require("fs");

fs.writeFile("./first.txt", "first file text", (err) => {
    if (err) console.log(Error);

    fs.appendFile("./first.txt", "\n a", (err) => {
        err && console.log(err);
    })

    fs.rename("./first.txt", "renamed.txt", err => {
        err && console.log(err);
    })
})