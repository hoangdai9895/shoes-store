const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
});

module.exports = Brand = mongoose.model("brand", BrandSchema);