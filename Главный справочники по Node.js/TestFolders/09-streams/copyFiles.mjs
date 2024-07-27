import fs, { read } from "fs";
import path from "path";

const sourceDir = "./files";
const destinationDir = "./copied-files";

if (!fs.existsSync(sourceDir)) {
    console.warn("Doesn`t exist!");
    process.exit(0);
}

if (fs.existsSync(destinationDir)) {
    fs.rmSync(destinationDir, {recursive: true,});
}

fs.mkdirSync(destinationDir);

fs.readdir(sourceDir, (err, fileNames) => {
    if (err) {
        console.log(err);
        process.exit(0);
    }

    console.log(fileNames);

    fileNames.forEach((fileName, index) => {
        const soursefilePath = path.join(sourceDir, fileName);
        const destinationFilePath = path.join(
            destinationDir,
            `${index + 1}. ${fileName}`
        );

        const readFileStream = fs.createReadStream(soursefilePath);
        const writeFileStream = fs.createWriteStream(destinationFilePath);

        readFileStream.pipe(writeFileStream);

        writeFileStream.on("finish", () =>
            console.log(`File ${fileName} was copied!`)
        );
    });
});