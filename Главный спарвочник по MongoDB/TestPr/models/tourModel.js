const mongoose = require("mongoose");
const slugify = require("slugify");
// const validtor = require("validator");

const tourSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "A tour must have a name!"],
            unique: true,
            trim: true,
            maxlenght: [
                40,
                "A tour name mush have less or equal then 40 characters!",
            ],
            minlenght: [
                10,
                "A tour name mush have less or equal then 40 characters!",
            ],
        },
        slug: String,
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
            enum: {
                values: ["easy", "medium", "difficult"],    
                message: "Difficulty is either: easy, medium, difficult!",
            },
        },
        raitingsAverage: {
            type: Number,
            default: 0,
            min: [1, "Raitings mush be above 1.0"],
            max: [5, "Raitings mush be below 5.0"],
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
            validate: {
                message:
                    "Discaunt price ({VALUE}) should be below regular price!",
                validator: function (val) {
                    return val < this.price;
                },
            },
        },
        summary: {
            type: String,
            trim: true,
            required: [true, "A tour must have a description!"],
        },
        description: {
            type: String,
            trim: true,
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
        secretTour: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

tourSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// tourSchema.post("save", function (doc, next) {
//     console.log(doc);
//     next();
// });

// tourSchema.pre("save", function (next) {
//     console.log("Will save document...");
//     next();
// });

// tourSchema.virtual("durationWeeks").get(function () {
//     return this.duration / 7;
// });

tourSchema.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } });
    this.start = Date.now();
    next();
});

tourSchema.post(/^find/, function (docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds!`);

    next();
});

tourSchema.pre("aggregate", function (next) {
    console.log(this.pipeline());

    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

    next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
