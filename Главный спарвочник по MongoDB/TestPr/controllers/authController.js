const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModal");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (id) => {
    return (token = jwt.sign(
        {
            id,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    ));
};

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
        status: "success",
        token,
        data: {
            user: newUser,
        },
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email or password", 401));
    }

    const token = signToken(user._id);

    res.status(200).json({
        status: "success",
        token,
    });
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(
            new AppError(
                "You are not logged in! Please log in to get access.",
                401
            )
        );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const freshUser = await User.findById(decoded.id);

    if (!freshUser) {
        return next(
            new AppError(
                "The user belonging to this token does no longer exist!",
                401
            )
        );
    }

    if (freshUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError(
                "User recently changed password! Plsease log in again!",
                401
            )
        );
    }

    req.user = freshUser;

    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("You dont have permission!", 403));
        }

        next();
    };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email,
    });

    if (!user) {
        next(new AppError("There us no user with email adress!", 404));
    }

    const resetToken = user.createPasswordResetToken();

    await user.save({ validateBeforeSave: false });
});

exports.resetPassword = (req, res, next) => {};
