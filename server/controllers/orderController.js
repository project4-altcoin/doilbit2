const bank = require('../models/bank');
const User = require('../models/userModel');
const OrdersAll = require("../models/ordersAll")

exports.trans = async(req, res, next) => {
    let data = await OrdersAll.find({})
    let buyquantityarr = 0;
    let buypricearr = [];
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

    console.log("buyquantityarr : ", buyquantityarr); //DB 안에 존재하는 매수가격의 최고가 수량


    if(req.body.sellprice == maxbuyprice) {

    }
    OrdersAll.create(req.body)
        .then(order => {         
            res.status(201).json({
                status: 'success',
                order                
            });
        })
        .catch(err => {
            res.status(400).json({
                status: 'fail',
                message: err
            });
        });

}

exports.deposit = (req, res, next) => {
    bank.deposit(req.body.userId, req.body.quantity)
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
