const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, 
};
const errorHandler = require('./middleware/error');
dotenv.config({ path: './config/.env' });
const PORT = process.env.PORT || 3000;
const apiV4 = process.env.API_URL_V4
const api = process.env.API_URL
const apiV3 = process.env.API_URL_V3
const apiV2 = process.env.API_URL_V2
const Orders = require('./routes/Orders');
const byOrder = require("./models/buyOrder")
const sellOrder = require("./models/sellOrder")


app.use(cors(corsOptions));
app.use(express.json()); 
app.use(logger);
app.use(errorHandler);
app.use(morgan('dev'));
app.use(`${apiV4}`, Orders)

const connectDB = require('./config/db');
connectDB();
const { db } = require("./models/BasicApi");               // import the db variable

app.get("/api/buy", async(req, res) => {
    try{
    const buy = await byOrder.find({}, {"_id":false, "price":true}).sort({"price":-1})
    const data = [];
    for(let i = 0; i < 5; i++) {
        data.push(buy[i]);
    }
    res.send(data)
    } catch(err) {
    console.error(err);
}
});
app.get("/api/sell", async(req, res) => {
    try{
    const sell = await sellOrder.find({},{"_id":false, "price":true}).sort({"price":1})
    const datas = [];
    for(let i = 0; i < 5; i++) {
        datas.push(sell[i]);
    }
    res.send(datas)
    } catch(err) {
    console.error(err);
}
});

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    server.close(() => {process.exit(1)});
});

