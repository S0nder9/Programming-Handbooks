import fs from "fs";

const filename = './files/file.txt';
const copiedFileName = './files/file-copy.txt';

const readStream = fs.createReadStream(filename);
const writeStream = fs.createWriteStream(copiedFileName);


readStream.pipe(writeStream);

readStream.on("end", () =>{
    console.log("Ended rs");
})

writeStream.on("finish", () => {
    console.log("File was copied!");
})

writeStream.on("close", () =>{
    console.log("Ended ws");
})