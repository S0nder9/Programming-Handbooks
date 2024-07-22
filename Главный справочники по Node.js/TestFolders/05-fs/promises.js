const fs = require("fs/promises");

fs.writeFile("first.txt", "first file text")
  .then(() => {
    console.log("1");
    return fs.appendFile("first.txt", "\n a");
  })
  .then(() => {
    console.log("2");
    return fs.rename("first.txt", "renamed.txt");
  })
  .then(() => {
    console.log("3");
    return fs.readFile("renamed.txt", "utf-8");
  })
  .then((data) => {
    console.log("File content:", data);
  })
  .catch((err) => {
    console.log(err);
  });
