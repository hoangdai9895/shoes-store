const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        required: true,
        type: String,
        maxlength: 100
    },
    description: {
        required: true,
        type: String,
        maxlength: 100000
    },
    price: {
        required: true,
        type: String,
        maxlength: 255
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: "brand",
        required: true
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: "type",
        required: true
    },
    images: {
        type: Array,
        default: []
    }
});

module.exports = product = mongoose.model("product", productSchema);