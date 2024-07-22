import EventEmitter from "events";
import fs from "fs";

const fileEmitter = new EventEmitter();

fileEmitter.on("writeComplite", () => {
    console.log("1");

    fs.appendFile("./first.txt", "\n a", (err) => {
        if (err) {
            console.error("Error appending to file:", err);
            return;
        }
        fileEmitter.emit("appendComplite");
    });
});

fileEmitter.on("appendComplite", () => {
    console.log("2");

    fs.rename("./first.txt", "renamed.txt", (err) => {
        if (err) {
            console.error("Error renaming the file:", err);
            return;
        }
        fileEmitter.emit("renameComplite");
    });
});

fileEmitter.on("renameComplite", () => {
    console.log("3");
});

fileEmitter.emit("writeComplite");
