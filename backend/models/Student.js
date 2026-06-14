const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    skill: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Placed", "Not Placed"],
        default: "Not Placed"
    }
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);