const fs = require("fs");
let isRunning = true;

setTimeout(() => {isRunning = false}, 10);
process.nextTick(() => {console.log("Nexntick")})

function setImmediatePromise () {
    return new Promise((resolve) => {
        setImmediate(() => {
            resolve()
        });
    })
}
async function whileLoop () {
    while (isRunning) {
        console.log("While loop is running...");
        await setImmediatePromise();
    }
}

whileLoop().then(() => console.log("While Loop Ended"));