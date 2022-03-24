const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productNaam: {type: String, required: true, unique: false},
    productPrijs: {type: Number, required: true, unique: false, default: 0},
    productAantal: {type: Number, required: false, unique: false, default: 0},
}, { timestamps: false });

module.exports = mongoose.model("Product", productSchema);