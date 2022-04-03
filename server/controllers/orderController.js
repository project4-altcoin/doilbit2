const bank = require('../models/bank');
const User = require('../models/userModel');
const OrdersAll = require("../models/ordersAll")
const concludeList = require("../models/concludelist");


exports.trans = async(req, res, next) => {
    let data = await OrdersAll.find({})
    let selldata = await OrdersAll.find({}, {"sellprice":true, "sellquantity":true})
    let selldataarr = [];
    let buydata = await OrdersAll.find({}, {"buyprice":true, "buyquantity":true})
    let depositdata = await bank.find({})
    let depositdataarr = [];
    let buydataarr = [];
    let buyquantityarr = 0;
    let buypricearr = [];
    let sellpricearr = [];
    let sellquantityarr = 0;
    
     // 현재 잔액 추출
    for(let i = 0; i < depositdata.length; i++){
        depositdataarr.push(depositdata[i].quantity)
    }   



    // 매도 데이터 추출
    for(let i = 0; i < selldata.length; i++) {
        if(selldata[i].sellprice != undefined) {
            selldataarr.push(selldata[i])
        }
    }

    // 매수 데이터 추출
    for(let i = 0; i < buydata.length; i++) {
        if(buydata[i].buyprice != undefined) {
            buydataarr.push(buydata[i])
        }
    }

    // 매수 최고가 구하기
    for(i = 0; i < data.length; i++) {
        if(data[i].buyprice !== undefined) buypricearr.push(data[i].buyprice)
    }
  
    // 매수 최고가
    var maxbuyprice = Math.max(...buypricearr) //DB 안에 존재하는 매수가격의 최고가  

    // 매수 최고가 수량 구하기
    for(i = 0; i < data.length; i++){
        if( data[i].buyprice == maxbuyprice){
            buyquantityarr += data[i].buyquantity // 매수 최고가의 수량
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
            sellquantityarr += data[i].sellquantity //매도 최저가의 수량
        }
    }

    //로직 실행 
 
    // 매도로직 시작(매수 최고가 필요)
    if(req.body.sellprice == maxbuyprice) {
        if(buyquantityarr - req.body.sellquantity == 0) {
           // 매도 매수 디비 데이터 둘다 삭제         
            await OrdersAll.deleteOne({buyprice : maxbuyprice})
            await concludeList.insertMany({"conquantity": req.body.sellquantity, "conprice": req.body.sellprice})
            await bank.updateOne({"quantity": depositdataarr}, {"$set" : {"quantity" : parseInt(depositdataarr) + parseInt((req.body.sellprice * req.body.sellquantity))}})
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
        })}  
        else if(req.body.sellquantity - buyquantityarr > 0) {        //매도 디비 데이터 갱신
            await OrdersAll.create(req.body) 
            await OrdersAll.updateOne({"sellprice" : req.body.sellprice }, {"$set" : {"sellquantity" :req.body.sellquantity - buyquantityarr}})
            await OrdersAll.deleteOne({"buyprice": maxbuyprice})
            await concludeList.insertMany({"conquantity": buyquantityarr, "conprice": req.body.sellprice}) 
            await bank.updateOne({"quantity": depositdataarr}, {"$set" : {"quantity" : parseInt(depositdataarr) + parseInt((req.body.sellprice * (req.body.sellquantity - buyquantityarr)))}})
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
        })
        } else if(buyquantityarr - req.body.sellquantity > 0) {
           //매수 디비 데이터 갱신          
           await OrdersAll.updateOne({"buyprice" : maxbuyprice }, {"$set" : {"buyquantity" :buyquantityarr - req.body.sellquantity}}) 
           await concludeList.insertMany({"conquantity": req.body.sellquantity, "conprice": req.body.sellprice})
           await bank.updateOne({"quantity": depositdataarr}, {"$set" : {"quantity" : parseInt(depositdataarr) + parseInt((req.body.sellprice * req.body.sellquantity))}})
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
    })        
       }
    }
    // 매수로직 시작(매도 최저가 필요)
     else if(req.body.buyprice == minsellprice){
        if(sellquantityarr - req.body.buyquantity == 0 ) {
            await OrdersAll.deleteOne({"sellprice" : minsellprice})
            await concludeList.insertMany({"conquantity": req.body.buyquantity, "conprice": req.body.buyprice})
            await bank.updateOne({"quantity": depositdataarr}, {"$set" : {"quantity" : parseInt(depositdataarr) - parseInt((req.body.buyprice * req.body.buyquantity))}})
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
        })
        } else if(req.body.buyquantity - sellquantityarr > 0){
            await OrdersAll.create(req.body)
            await OrdersAll.updateOne({"buyprice" : req.body.buyprice }, {"$set" : {"buyquantity" :req.body.buyquantity - sellquantityarr}})
            await OrdersAll.deleteOne({sellprice : minsellprice})
            await concludeList.insertMany({"conquantity": sellquantityarr, "conprice": req.body.buyprice})
            await bank.updateOne({"quantity": depositdataarr}, {"$set" : {"quantity" : parseInt(depositdataarr) - parseInt((req.body.buyprice * sellquantityarr))}})
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
        })

        } else if(sellquantityarr - req.body.buyquantity > 0) {
            //매수 디비 데이터 갱신          
            await OrdersAll.updateOne({"sellprice" : minsellprice }, {"$set" : {"sellquantity" :sellquantityarr - req.body.buyquantity}})
            await concludeList.insertMany({"conquantity": req.body.buyquantity, "conprice": req.body.buyprice})
            await bank.updateOne({"quantity": depositdataarr}, {"$set" : {"quantity" : parseInt(depositdataarr) - parseInt((req.body.buyprice * req.body.buyquantity))}})
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
        })        
        }
    }
    
    // 매수 최고가보다 낮은 가격으로 매도시 매수최고가 수량 차감

    if(req.body.sellprice < maxbuyprice && req.body.sellquantity < buyquantityarr) {
        await OrdersAll.updateOne({"buyprice" : maxbuyprice }, {"$set" : {"buyquantity" :buyquantityarr - req.body.sellquantity}}) 
        await concludeList.insertMany({"conquantity": req.body.sellquantity, "conprice": maxbuyprice})
        await bank.updateOne({"quantity": depositdataarr}, {"$set" : {"quantity" : parseInt(depositdataarr) + parseInt((req.body.sellprice * req.body.sellquantity))}})
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
    })    
    }

    if(req.body.sellprice < maxbuyprice && req.body.sellquantity > buyquantityarr) {
        await OrdersAll.deleteOne({"buyprice": maxbuyprice})
        await OrdersAll.insertMany({"sellprice": maxbuyprice, "sellquantity":req.body.sellquantity - buyquantityarr})
        await concludeList.insertMany({"conquantity": buyquantityarr, "conprice": maxbuyprice})
        await bank.updateOne({"quantity": depositdataarr}, {"$set" : {"quantity" : parseInt(depositdataarr) + parseInt((maxbuyprice * buyquantityarr))}})
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
    })  
    }

     // 매도 최저가보다 높은 가격으로 매수시 매도최고가 수량 차감

    
     if(req.body.buyprice > minsellprice && req.body.buyquantity < sellquantityarr) {
        await OrdersAll.updateOne({"sellprice" : minsellprice }, {"$set" : {"sellquantity" :sellquantityarr - req.body.buyquantity}}) 
        await concludeList.insertMany({"conquantity": req.body.buyquantity, "conprice": minsellprice})
        await bank.updateOne({"quantity": depositdataarr}, {"$set" : {"quantity" : parseInt(depositdataarr) - parseInt((req.body.buyprice * req.body.buyquantity))}})
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
    })
    }

    if(req.body.buyprice > minsellprice && req.body.buyquantity > sellquantityarr) { 
        await OrdersAll.deleteOne({"sellprice": minsellprice})
        await OrdersAll.insertMany({"buyprice": minsellprice, "buyquantity":req.body.buyquantity - sellquantityarr})
        await concludeList.insertMany({"conquantity": sellquantityarr, "conprice": minsellprice}) 
        await bank.updateOne({"quantity": depositdataarr}, {"$set" : {"quantity" : parseInt(depositdataarr) - parseInt((minsellprice * sellquantityarr))}})
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
    })
    }




    // 매도 가격중복 수량 중첩
           for(let i = 0; i < sellpricearr.length; i++) {       
            if(req.body.sellprice == selldataarr[i].sellprice) {
                let resetsellquantity = parseInt(req.body.sellquantity) + parseInt(selldataarr[i].sellquantity)
                await OrdersAll.updateOne({"sellprice" : req.body.sellprice }, {"$set" : {"sellquantity" :resetsellquantity}})
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
            })             
            }
        }

    //매수 가격중복 수량 중첩
        for(let i = 0; i < buypricearr.length; i++) {       
            if(req.body.buyprice == buydataarr[i].buyprice) {
                let resetbuyquantity = parseInt(req.body.buyquantity) + parseInt(buydataarr[i].buyquantity)
                await OrdersAll.updateOne({"buyprice" : req.body.buyprice }, {"$set" : {"buyquantity" :resetbuyquantity}})
                await bank.updateOne({"quantity": depositdataarr}, {"$set" : {"quantity" : parseInt(depositdataarr) - parseInt((req.body.buyprice * req.body.buyquantity))}})
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
            })
            }
        }

        if(sellpricearr.includes(parseInt(req.body.buyprice)) == false 
        && buypricearr.includes(parseInt(req.body.buyprice)) == false 
        && sellpricearr.includes(parseInt(req.body.sellprice)) == false 
        && buypricearr.includes(parseInt(req.body.sellprice)) == false
        && (req.body.sellprice > maxbuyprice || req.body.buyprice < minsellprice)
       ) {
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


// unix time stamp to date
function unixtodate(unixtime) {
    var date = new Date(unixtime * 1000);
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var hour = ("0" + date.getHours()).slice(-2);
    var min = ("0" + date.getMinutes()).slice(-2);
    var sec = ("0" + date.getSeconds()).slice(-2);
    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
}