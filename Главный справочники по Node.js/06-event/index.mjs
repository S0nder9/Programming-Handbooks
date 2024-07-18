import EventEmitter from "events";

const myEmitter = new EventEmitter();

const timeoutListenerFn = (sQ) => {
    console.log(`Timeout event! ${sQ}`);
}

myEmitter.on("timeout", timeoutListenerFn)

setTimeout(() => myEmitter.emit("timeout", 1), 1000);
setTimeout(() => myEmitter.emit("timeout", 2), 2000);

myEmitter.once("singleEvent", () => {
    console.log("dfdfdfdfdfdfdfdfdfddffd");
})

setTimeout(() => myEmitter.emit("singleEvent"), 500);
setTimeout(() => myEmitter.emit("singleEvent"), 1500);

setTimeout(() => {myEmitter.off("timeout", timeoutListenerFn), 3000})