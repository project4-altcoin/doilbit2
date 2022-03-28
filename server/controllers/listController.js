const buyOrder = require('../models/buyOrder');
const OrdersAll = require('../models/ordersAll');
const sellOrder = require('../models/sellOrder');

exports.buyapi = async (req, res, next) => {
    try{
        const buy = await OrdersAll.find({}).sort({"buyprice":-1})
           // , {"_id":false, "buyprice":true, "buyquantity":true }).sort({"buyprice":-1})
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
            //, {"_id":false, "sellprice":true, "sellquantity":true})
        //.sort({"sellprice":1})
        const data = [];
        
        
        for(let i = 0; i < 5; i++) {
            console.log(sell[i].sellprice)
            if(sell[i].sellprice != undefined)
            data.push(sell[i]);
            }
     
   
        // const datas = data.reverse()
        res.send(data)
        } catch(err) {
        console.error(err);
}
}