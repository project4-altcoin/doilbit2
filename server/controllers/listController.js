const OrdersAll = require('../models/ordersAll');


exports.buyapi = async (req, res, next) => {
    try{
        const buy = await OrdersAll.find({}).sort({"buyprice":-1})
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
        const sell = await OrdersAll.find({}, {"_id":false, "sellprice":true, "sellquantity":true}).sort({"sellprice":1})
        const data = [];
        const data2 = [];      
        for(let i = 0; i < sell.length; i++) {
            if(sell[i].sellprice != undefined)
            data.push(sell[i]);
            }
            for(let j = 0; j < 5; j++) {
                data2.push(data[j])
            }
            const datas = data2.reverse()
        res.send(datas)
        } catch(err) {
        console.error(err);
}
}