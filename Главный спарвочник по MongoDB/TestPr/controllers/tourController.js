const Tour = require("../models/tourModel");

exports.createTour = async (req, res) => {
    console.log(req.requestTime);
    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};
