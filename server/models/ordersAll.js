const mongoose = require('mongoose');

const ordersAllSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    buyquantity: {
        type: Number,
    },
    buyprice: {
        type: Number,
    },
    sellquantity: {
        type: Number,
    },
    sellprice: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const OrdersAll = mongoose.model('ordersAll', ordersAllSchema);
module.exports = OrdersAll;