const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    email: {
        type: String
    },
    name: {
        type: String
    },
    phone: {
        type: Number
    },
    address: {
        type: String
    },
    items: [],
    date: {
        type: Date,
        default: Date.now
    },
    isFinished: {
        type: Boolean,
        default: false
    }
})

module.exports = Order = mongoose.model('order', OrderSchema)