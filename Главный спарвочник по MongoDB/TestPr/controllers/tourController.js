const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("../utils/handlerFactory");

exports.aliasTopTour = (req, res, next) => {
    req.query.limit = "5";
    req.query.sort = "-ratingAverage,price";
    req.query.fields = "name,price,ratingAverage,summary,difficulty";
    next();
};

exports.getTourStats = catchAsync(async (req, res, next) => {
    const stats = await Tour.aggregate([
        {
            $match: { rating: { $gte: 4.5 } },
        },
        {
            $group: {
                _id: { $toUpper: "$difficulty" },
                numTours: { $sum: 1 },
                numRatings: { $sum: "$ratingsQuantity" },
                avgRating: { $avg: "$rating" },
                avgPrice: { $avg: "$price" },
                minPrice: { $min: "$price" },
                maxPrice: { $max: "$price" },
            },
        },
        {
            $sort: {
                avgPrice: 1,
            },
        },
    ]);

    res.status(200).json({
        status: "success",
        data: {
            stats,
        },
    });
});

exports.getMonthlyPlay = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
        {
            $unwind: "$startDates",
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                },
            },
        },
        {
            $group: {
                _id: { $month: "$startDates" },
                numTourStarts: { $sum: 1 },
                tours: { $push: "$name" },
            },
        },
        { $addFields: { month: "$_id" } },
        {
            $project: {
                _id: 0,
            },
        },
        {
            $sort: {
                numTourStarts: -1,
            },
        },
    ]);

    res.status(200).json({
        status: "success",
        data: {
            plan,
        },
    });
});

exports.getAllTours = factory.getAll(Tour);

exports.createTour = factory.createOne(Tour);

exports.getTour = factory.getOne(Tour, { path: "reviews" });

exports.updateTour = factory.updateOne(Tour);

exports.deleteTour = factory.deleteOne(Tour);

exports.getToursWithin = catchAsync(async (req, res, next) => {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(",");

    const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

    if (!lat || !lng) {
        return next(
            new AppError(
                "Please provide latitude and longitude in the format lat,lng",
                404
            )
        );
    }

    const tours = await Tour.find({
        startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });

    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            data: tours,
        },
    });
});

exports.getDistances = catchAsync(async (req, res, next) => {
    const { latlng, unit } = req.params;
    const [lat, lng] = latlng.split(",");

    if (!lat || !lng) {
        return next(
            new AppError(
                "Please provide latitude and longitude in the format lat,lng",
                404
            )
        );
    }

    const multiplier = unit === "mi" ? 0.000621371 : 0.001;

    const distances = await Tour.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [parseFloat(lng), parseFloat(lat)],
                },
                distanceField: "distance",
                distanceMultiplier: multiplier,
            },
        },
        {
            $project: {
                distance: 1,
                name: 1,
            },
        },
    ]);

    res.status(200).json({
        status: "success",
        data: {
            data: distances,
        },
    });
});
