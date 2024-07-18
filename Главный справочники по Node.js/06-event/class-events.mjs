import EventEmitter from "events";

class Post extends EventEmitter {
    constructor(author, text) {
        super();

        this.author = author;
        this.text = text;
        this.likesQty = 0;
        this.on("likePost", (userName) => {
            console.log(`${userName} Liked Your Post`);
        });

        this.on("error", (error) => {
            console.error(error);
        });
    }

    like(userName) {
        if (!userName) {
            return this.emit("error", new Error("!Request!"));
        }
        this.likesQty++;
        this.emit("likePost", userName);
    }
}

const myPost = new Post("Bogdan", "Text");

// console.log(myPost.author);
// console.log(myPost.text);
// console.log(myPost.likesQty);
myPost.like("Bogdan");

setTimeout(() => {
    myPost.like(), 1000;
});
setTimeout(() => {
    myPost.like(), 2000;
});

// console.log(myPost.likesQty);
