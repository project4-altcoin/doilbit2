const mongoos = require('mongoose');

const sellOrderSchema = new mongoos.Schema({
    userId: {
        type: mongoos.Schema.Types.ObjectId,
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

const SellOrder = mongoos.model('SellOrder', sellOrderSchema);
module.exports = SellOrder;