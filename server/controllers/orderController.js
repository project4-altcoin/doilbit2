const bank = require('../models/bank');
const User = require('../models/userModel');
const OrdersAll = require("../models/ordersAll")
const axios = require('axios')

exports.trans = (req, res, next) => {
    // // 매수 가격 데이터
    // console.log("what? : ", req.body.buyprice)
    // // 매수 로직
    // // 매수 데이터 가격 == 매도 데이터 check

    // var dbselldtarr = [];
    
    // var dbsellprice = async() => {
    //     try {
    //         let dbsellraw = await axios.get("http://localhost:3001/exchange/sellapi")
    //         // console.log(dbsellraw.data)
    //         for(let i = 0; i < dbsellraw.data.length; i ++){
    //             // console.log("sellprice: ", dbsellraw.data[i].sellprice)
    //             dbselldtarr.push(dbsellraw.data[i].sellprice)
    //             console.log("sellprice array : ", dbselldtarr)
    //         }
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }

    // dbsellprice();
    // console.log("what about here : ", dbselldtarr)

    // // function dbsellpriceE () {
    // //     return new Promise(function(resolve){
    // //         let result = dbsellprice()
    // //         resolve(result)
    // //     })
    // // }  

    // // dbsellpriceE().then(function(dt){console.log(dt.data)});

    // // console.log("dbsellprice : ", dbsellprice)
    // // if(req.body.buyprice == ){

    // // }
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
