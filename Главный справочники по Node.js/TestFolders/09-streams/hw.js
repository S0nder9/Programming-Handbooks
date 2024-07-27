const stream = require("stream");

const invertedStringHandler = new stream.Transform({
    transform(chunk, encoding, callback) {
        const strToArr = chunk.toString().split('').reverse().join('');
        callback(null, strToArr);
    }
});

process.stdin.pipe(invertedStringHandler).pipe(process.stdout);
