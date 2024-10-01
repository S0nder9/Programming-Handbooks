const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");

exports.aliasTopTour = (req, res, next) => {
    req.query.limit = "5";
    req.query.sort = "-ratingAverage,price";
    req.query.fields = "name,price,ratingAverage,summary,difficulty";
    next();
};

exports.getAllTours = async (req, res) => {
    try {
        const features = new APIFeatures(Tour.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const tours = await features.query;

        res.status(200).json({
            status: "success",
            results: tours.length,
            data: {
                tours,
            },
        });
    } catch (err) {
        console.error("Error fetching tours:", err);
        res.status(400).json({
            status: "fail",
            message: "Failed to retrieve tours",
            error: err.message,
        });
    }
};

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        console.error("Error creating tour:", err);
        res.status(400).json({
            status: "fail",
            message: "Invalid data provided",
            error: err.message,
        });
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);

        if (!tour) {
            return res.status(404).json({
                status: "fail",
                message: "Tour not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                tour,
            },
        });
    } catch (err) {
        console.error("Error fetching tour:", err);
        res.status(400).json({
            status: "fail",
            message: "Failed to retrieve tour",
            error: err.message,
        });
    }
};

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!tour) {
            return res.status(404).json({
                status: "fail",
                message: "Tour not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                tour,
            },
        });
    } catch (err) {
        console.error("Error updating tour:", err);
        res.status(400).json({
            status: "fail",
            message: "Failed to update tour",
            error: err.message,
        });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id);

        if (!tour) {
            return res.status(404).json({
                status: "fail",
                message: "Tour not found",
            });
        }

        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        console.error("Error deleting tour:", err);
        res.status(400).json({
            status: "fail",
            message: "Failed to delete tour",
            error: err.message,
        });
    }
};

exports.getTourStats = async (req, res) => {
    try {
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
    } catch (err) {
        console.error("Error fetching tour stats:", err);
        res.status(400).json({
            status: "fail",
            message: "Failed to retrieve stats",
            error: err.message,
        });
    }
};

exports.getMonthlyPlay = async (req, res) => {
    try {
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
                    numTourStarts: -1
                }
            },
        ]);

        res.status(200).json({
            status: "success",
            data: {
                plan,
            },
        });
    } catch (err) {
        console.error("Error fetching tour stats:", err);
        res.status(400).json({
            status: "fail",
            message: "Failed to retrieve stats",
            error: err.message,
        });
    }
};
