const bank = require('../models/bank');
const User = require('../models/userModel');
const OrdersAll = require("../models/ordersAll")
const axios = require('axios')

exports.trans = async(req, res, next) => {
    let data = await OrdersAll.find({})
    let buyquantityarr = 0;
    let buypricearr = [];
    let sellpricearr = [];
    let sellquantityarr = 0;





    // 매수 최고가 구하기
    for(i = 0; i < data.length; i++) {
        if(data[i].buyprice !== undefined) buypricearr.push(data[i].buyprice)
    }
  
   var maxbuyprice = Math.max(...buypricearr) //DB 안에 존재하는 매수가격의 최고가  

    // 매수 최고가 수량 구하기
    for(i = 0; i < data.length; i++){
        if( data[i].buyprice == maxbuyprice){
            buyquantityarr += data[i].buyquantity
        }
    }

    // 매도 최저가 구하기
    for(i = 0; i < data.length; i++) {
        if(data[i].sellprice !== undefined) sellpricearr.push(data[i].sellprice)
    }
    
    //매도 최저가
    var minsellprice = Math.min(...sellpricearr)
    
    for(i = 0; i < data.length; i++){
        if( data[i].sellprice == minsellprice){
            sellquantityarr += data[i].sellquantity
        }
    }
    //매도 최저가의 수량
    console.log("sellquantityarr : ", sellquantityarr)

    
    // 매도로직 시작(매수 최고가 필요)
    if(req.body.sellprice == maxbuyprice) {
        if(buyquantityarr - req.body.sellquantity == 0) {
           // 매도 매수 디비 데이터 둘다 삭제          
            await OrdersAll.deleteOne({buyquantity : buyquantityarr}) 
        }       
        else if(req.body.sellquantity - buyquantityarr > 0) {
        console.log("==================================== success!!==============================")           //매도 디비 데이터 갱신
            await OrdersAll.create(req.body) // 가격 150 수량 150
            await OrdersAll.updateOne({"sellquantity" : req.body.sellquantity }, {"$set" : {"sellquantity" :req.body.sellquantity - buyquantityarr}})
            await OrdersAll.deleteOne({buyquantity : buyquantityarr}) 
        } else if(buyquantityarr - req.body.sellquantity > 0) {
           //매수 디비 데이터 갱신          
           await OrdersAll.updateOne({"buyquantity" : buyquantityarr }, {"$set" : {"buyquantity" :buyquantityarr - req.body.sellquantity}})         
       }
    }
    // 매수로직 시작(매도 최저가 필요)
     else if(req.body.buyprice == minsellprice){

        if(sellquantityarr - req.body.buyquantity == 0 ) {
            await OrdersAll.deleteOne({sellquantity : sellquantityarr})
        } else if(req.body.buyquantity - sellquantityarr > 0){
            await OrdersAll.create(req.body)
            await OrdersAll.updateOne({"buyquantity" : req.body.buyquantity }, {"$set" : {"buyquantity" :req.body.buyquantity - sellquantityarr}})
            await OrdersAll.deleteOne({sellquantity : sellquantityarr})
        } else if(sellquantityarr - req.body.buyquantity > 0) {
            //매수 디비 데이터 갱신          
            await OrdersAll.updateOne({"sellquantity" : sellquantityarr }, {"$set" : {"sellquantity" :sellquantityarr - req.body.buyquantity}})         
        }

    }





    // OrdersAll.create(req.body)
    //     .then(order => {         
    //         res.status(201).json({
    //             status: 'success',
    //             order                
    //         });
    //     })
    //     .catch(err => {
    //         res.status(400).json({
    //             status: 'fail',
    //             message: err
    //         });
    //     });

}

exports.deposit = (req, res, next) => {
    bank.deposit(req.body.userId, req.body.quantity)
        .then(quantity => {ㄴ
            res.status(201).json({
                status: 'success',
                quantity
            });
        }
        )
        .catch(err => {
            res.status(400).json({
                status: 'fail',
                message: err
            });
        }
        );
}

exports.withdraw = (req, res, next) => {
    bank.withdraw(req.body.userId, req.body.quantity)
        .then(quantity => {
            res.status(201).json({
                status: 'success',
                quantity
            });
        }
        )
        .catch(err => {
            res.status(400).json({
                status: 'fail',
                message: err
            });
        }
        );
}

exports.balance = (req, res, next) => {
    bank.getBalance(req.body.userId)
        .then(quantity => {
            res.status(201).json({
                status: 'success',
                quantity
            });
        }
        )
        .catch(err => {
            res.status(400).json({
                status: 'fail',
                message: err
            });
        }
        );
}



exports.signup = (req, res, next) => {
    User.create(req.body)
        .then(user => {
            res.status(201).json({
                status: 'success',
                user
            });
        })
        .catch(err => {
            res.status(400).json({
                status: 'fail',
                message: err
            });
        });
}
