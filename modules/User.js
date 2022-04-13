const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },
    geld: {type: Number, default: 0},
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);