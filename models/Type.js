const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeSchema = new Schema({
    name: {
        required: true,
        type: String,
        maxlength: 100,
        unique: 1
    }
});

module.exports = Type = mongoose.model("type", typeSchema);