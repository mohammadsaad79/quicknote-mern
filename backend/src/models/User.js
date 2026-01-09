const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [
        /^[6-9]\d{9}$/,
        'Please enter a valid Indian phone number'
        ]
    },
    role: {
        type: String,
        default: "Full Stack Developer"
    },
    bio: {
        type: String,
        default: "Passionate about building scalable web applications.",
    },
    avatar: {
        type: String,
        default: "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
    },
}, {timestamps: true})

module.exports = mongoose.model("User", userSchema);