const Tour = require("../models/tourModel");

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

exports.getAllTours = async (req, res) => {
    try {
        const queryObj = { ...req.query };
        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        );

        let query = Tour.find(JSON.parse(queryStr));

        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            console.log(sortBy);
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v");
        }

        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const numTours = await Tour.countDocuments();
            if (skip >= numTours) {
                throw new Error("This page does not exsist!")
            }
        }

        const tours = await query;

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
