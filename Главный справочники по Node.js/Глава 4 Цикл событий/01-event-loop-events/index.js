const fs = require("fs");
const dns = require("dns");

function info(text) {
    console.log(text, performance.now().toFixed(2))
}

info("Program start");

setTimeout(() => {info("Timeout 1")}, 0);
setTimeout(() => {
    process.nextTick(() => {
        info("Timeout 2")
        info("Nexttick2")   
    }
)}, 100);

let intervalCount = 1;

const interval = setInterval(() => {

    info(`Interval ${intervalCount++}`);
    
    if (intervalCount === 2) {
        clearInterval(interval)
    }}, 50);

fs.writeFile("./test.txt", "Hello NodeJs", () => {info("file written")})

Promise.resolve().then(() => {info("Promise 1")});

process.nextTick(() => {info("Nexttick1")});

setImmediate(() => {info("Immediate 1")});

dns.lookup("localhost", (err, address, family) => {
    info("DNS localhost", address, family);
    Promise.resolve().then(() => {info("Promise2")});
    process.nextTick(() => {info("Nexttick3")})

});

console.log("Program end");