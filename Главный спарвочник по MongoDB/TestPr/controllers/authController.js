const User = require("../models/userModal");
const catchAsync = require("../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            user: newUser,
        },
    });
});
