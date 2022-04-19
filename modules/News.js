
const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    newsTitel: {type: String, required: true, unique: false},
    newsAfbeelding: {type: String, required: true, unique: false},
    newsInhoud: {type: String, required: true, unique: false},
}, { timestamps: true });

module.exports = mongoose.model("News", newsSchema);