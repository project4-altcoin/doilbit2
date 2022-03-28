const mongoose = require('mongoose');

const ordersAll = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    buyquantity: {
        type: Number,
        required: false
    },
    buyprice: {
        type: Number,
        required: false
    },
    sellquantity: {
        type: Number,
        required: false
    },
    sellprice: {
        type: Number,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ordersAll = mongoose.model('ordersAll', ordersAll);
module.exports = ordersAll;