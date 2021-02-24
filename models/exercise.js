const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "Exercise type is required."
        },
        name: {
            type: String,
            trim: true,
            required: "Exercise name is required."
        },
        distance: {
            type: Number
        },
        duration: {
            type: Number,
            required: "Exercise durations is required."
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        }
    }]
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;