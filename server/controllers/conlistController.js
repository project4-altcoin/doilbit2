const concludeList = require('../models/concludelist');

// 거래내역 조회 쿼리

exports.conclude = async (req, res, next) => {
    try{
        const conclude = await concludeList.find({}, {"_id":false}).sort({ createdAt:-1})
        const data = [];
        for(let i = 0; i < 10; i++) {
            data.push(conclude[i]);
        }
        res.send(data)
        } catch(err) {
        console.error(err);
}
}

//거래 체결 내역중 price값이 가장 높은값

exports.highprice = async (req, res, next) => {
    try{
        const highprice = await concludeList.find({}, {"_id":false, "conprice":true}).sort({ conprice:-1 })
        const data = [];
        for(let i = 0; i < 1; i++) {
            data.push(highprice[i]);
        }
        res.send(data)
        } catch(err) {
        console.error(err);
}
}

//거래 체결 내역중 price값이 가장 낮은값

exports.lowprice = async (req, res, next) => {
    try{
        const lowprice = await concludeList.find({}, {"_id":false, "conprice":true}).sort({ conprice:1 })
        const data = [];
        for(let i = 0; i < 1; i++) {
            data.push(lowprice[i]);
        }
        res.send(data)
        } catch(err) {
        console.error(err);
}
}

// 총 거래내역, 가격 구하는 쿼리

exports.totalquantity = async (req, res, next) => {
    try{
        const totalquantity = await concludeList.find({}, {"_id":false, "conquantity":true, "conprice":true}).sort({ conquantity:1 })
        const data = [];
        for(let i = 0; i < totalquantity.length; i++) {
            data.push(totalquantity[i]);
        }
        res.send(data)
        } catch(err) {
        console.error(err);
}
}

//현재가 가져오는 쿼리

exports.currentprice = async (req, res, next) => {
    try{
        const currentprice = await concludeList.find({}, {"_id":false, "conprice":true}).sort({ createdAt: -1 })
        const data = [];
        for(let i = 0; i < 1; i++) {
            data.push(currentprice[i]);
        }
        res.send(data)
        } catch(err) {
        console.error(err);
}
}

exports.currentprice2 = async (req, res, next) => {
    try{
        const currentprice = await concludeList.find({}, {"_id":false, "conprice":true}).sort({ createdAt: -1 })
        const data = [];
        for(let i = 0; i < 10; i++) {
            data.push(currentprice[i]);
        }
        let datas = data.reverse()
        res.send(datas)
        } catch(err) {
        console.error(err);
}
}

