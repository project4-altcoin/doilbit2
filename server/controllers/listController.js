const buyOrder = require('../models/buyOrder');
const sellOrder = require('../models/sellOrder');

exports.buyapi = async (req, res, next) => {
    try{
        const buy = await buyOrder.find({}, {"_id":false, "price":true, "quantity":true}).sort({"price":-1})
        const data = [];
        for(let i = 0; i < 5; i++) {
            data.push(buy[i]);
        }
        res.send(data)
        } catch(err) {
        console.error(err);
}
}

exports.sellapi = async (req, res, next) => {
    try{
        const sell = await sellOrder.find({}, {"_id":false, "price":true, "quantity":true}).sort({"price":1})
        const data = [];
        for(let i = 0; i < 5; i++) {
            data.push(sell[i]);
        }
        res.send(data)
        } catch(err) {
        console.error(err);
}
}