const Tour = require("../models/tourModel");

exports.createTour = async (req, res) => {
    console.log(req.requestTime);
    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.getAllTours = async (req, res) => {
    try {
        const queryObj = { ...req.query };
        console.log(queryObj);
        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach((el) => {
            delete queryObj[el];
        });

        const query = await Tour.find(queryObj);
        const tours = await query;
        res.status(200).json({
            status: "success",
            result: tours.length,
            data: {
                tours,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.getTour = async (req, res) => {
    console.log(req);

    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                tour,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.updateTour = async (req, res) => {
    console.log(req);

    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: "success",
            data: {
                tour,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.deleteTour = async (req, res) => {
    console.log(req);

    try {
        const tour = await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};
