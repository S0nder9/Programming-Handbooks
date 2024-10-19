const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name!"],
        maxlength: [
            50,
            "A User name must have less or equal to 50 characters!",
        ],
    },
    email: {
        type: String,
        required: [true, "Please tell us your email!"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email!"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        minlength: 8,
    },
    photo: {
        type: String,
        default: "default.jpg",
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password!"],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords are not the same!",
        },
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hashSync(this.password, 12);

    this.passwordConfirm = undefined;
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;