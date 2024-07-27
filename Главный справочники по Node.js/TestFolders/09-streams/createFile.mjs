import fs from "fs";

if (!process.argv[2] || !process.argv[3]) {
    console.log("Usage: node script.js <fileName> <linesQty>");
    process.exit(0);
}

const fileName = process.argv[2];
const linesQty = parseInt(process.argv[3]);

if (isNaN(linesQty)) {
    console.log("Invalid syntax: <linesQty> must be a number.");
    process.exit(0);
}

const writeStream = fs.createWriteStream(fileName);

for (let i = 0; i < linesQty; i++) {
    writeStream.write(`This is line ${i + 1}\n`);
}

writeStream.end(() => {
    console.log(`File ${fileName} created with ${linesQty} lines.`);
});