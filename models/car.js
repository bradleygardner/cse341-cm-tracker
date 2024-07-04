const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String
    },
    year: {
        type: String
    },
    //Maybe add image at some point
    // picture: {
    //     type: 
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Car", CarSchema)