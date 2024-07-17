import { EventEmitter, getMaxListeners } from "events";

const myEmitter = new EventEmitter();

myEmitter.on("myEvent", () => {
    console.log("first");
});

myEmitter.on("myEvent", () => {
    console.log("second");
});

myEmitter.setMaxListeners(25);

myEmitter.on("myEvent", () => {
    console.log("third");
});
myEmitter.on("otherEvent", () => {
    console.log("otherEvent");
});
console.log(myEmitter.getMaxListeners());
console.log(myEmitter.eventNames());

setTimeout(() => {
    myEmitter.emit("myEvent"), 1000;
});
