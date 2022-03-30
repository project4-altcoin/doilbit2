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
const PORT = process.env.PORT || 3001;
const apiV4 = process.env.API_URL_V4
const api = process.env.API_URL
const apiV3 = process.env.API_URL_V3
const apiV2 = process.env.API_URL_V2
const Orders = require('./routes/Orders');
const Users = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');

const balancesocket = require("./socket/balancesocket")
const pricesocket = require("./socket/pricesocket")
const concludesocket = require("./socket/concludesocket")

balancesocket();
pricesocket();
concludesocket();


app.use(cookieParser())
app.use(cors(corsOptions));
app.use(express.json()); 
app.use(logger);
app.use(errorHandler);
app.use(morgan('dev'));
app.use(`${apiV4}`, Orders)
app.use(`${api}`, Users)

app.get('/cookietest', (req, res) => {
    res.cookie('token', '123456789')
})

const connectDB = require('./config/db');
connectDB();
const { db } = require("./models/BasicApi");               // import the db variable

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    server.close(() => {process.exit(1)});
});

