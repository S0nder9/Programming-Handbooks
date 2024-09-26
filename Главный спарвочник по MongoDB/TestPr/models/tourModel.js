const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name!"],
        unique: true,
        trim: true,
    },
    duration: {
        type: Number,
        required: [true, "A tour must have a duration!"],
    },
    maxGroupSize: {
        type: Number,
        required: [true, "A tour must have a group size!"],
    },
    difficulty: {
        type: String,
        required: [true, "A tour must have a difficulty!"],
    },
    raitingsAverage: {
        type: Number,
        default: 0,
    },
    raitingsQuantity: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price!"],
    },
    priceDiscount: {
        type: Number,
    },
    summary: {
        type: String,
        trim: true,
        required: [true, "A tour must have a description!"],
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        trim: true,
        required: [true, "A tour must have a cover image!"],
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
    startDates: [Date],
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
