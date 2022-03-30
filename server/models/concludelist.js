const mongoose = require('mongoose');

const concludeListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    conquantity: {
        type: Number,
    },
    conprice: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const concludeList = mongoose.model('concludeList', concludeListSchema);
module.exports = concludeList;