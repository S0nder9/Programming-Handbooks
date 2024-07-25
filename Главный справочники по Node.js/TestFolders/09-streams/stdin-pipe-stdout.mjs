import stream, { Stream } from "node:stream";
import fs from "fs";


const upperCaseStream = new Stream.Transform({
  transform(chunck, enc, cb) {
    const upperCased = chunck.toString().toUpperCase();
    cb(null, upperCased);
  }
})

process.stdin.pipe(upperCaseStream).pipe(process.stdout);

// const path = "./text.txt";

// const writeStream = fs.createWriteStream(path);

// process.stdin.pipe(writeStream);