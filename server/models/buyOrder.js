const mongoose = require('mongoose');

const buyOrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const BuyOrder = mongoose.model('BuyOrder', buyOrderSchema);
module.exports = BuyOrder;