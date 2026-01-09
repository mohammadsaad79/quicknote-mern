const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    content: {
        type: String,
        trim: true,
        required: true,
    },
    color: {
        type: String,
        default: 'default',
    },
    pinned: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    } 
}, {timestamps: true})

module.exports = mongoose.model('Note', noteSchema);