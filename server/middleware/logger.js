
//@desc Logs request to console
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`); //middleware : 각 요청이 시작되고 종료되기 전에 실행되는 함수 
    next();                                                                //next()     : 요청이 종료되기 전에 다음 middleware로 이동하는 함수
}

module.exports = logger;  
