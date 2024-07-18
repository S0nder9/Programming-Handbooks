const path = require("path");

const filePath = '/home/user/docs/index.js';
const textFilePath = '/home/user/docs/file.txt';
const relativePath = "./node/movie.mov";
const directoryPath = "./node/sub";


console.log(path.basename(filePath));
console.log(path.basename(directoryPath));

console.log(path.dirname(directoryPath));
console.log(path.extname(directoryPath));


const parsedName = path.parse(filePath);
console.log(path.join(parsedName.dir, `renamed-${parsedName.name}.mjs`));