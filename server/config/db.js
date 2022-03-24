// import mongoose : mongoDB
const mongooose = require("mongoose"); 
const color = require("colors");

const connectDB = async () => {
    const conn = await mongooose.connect(process.env.CONNECTION_STRING,{
        useNewUrlParser: true,                                // use new url parser : mongoose 5.x 이상에서는 이걸 써줘야 함 
        useUnifiedTopology: true,                             // connect to mongodb cluster 옵션 설정부분
        dbname: "BasicApi"
    }).then(() => {
        console.log(`Connected to DB: ${process.env.CONNECTION_STRING}`.blue);
    }).catch(err => {
        console.log(err);
    });
}

module.exports = connectDB;