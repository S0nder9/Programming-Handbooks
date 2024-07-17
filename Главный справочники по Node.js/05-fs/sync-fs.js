const fs = require("fs");

try {

    fs.writeFileSync("./first.txt", "first file text");
    console.log("1");
    
    fs.appendFileSync("./first.txt", "\n a");
    console.log("2");
    
    fs.renameSync("./first.txt", "renamed.txt")
    console.log("3");
} catch (err){
    console.log(err);
}
