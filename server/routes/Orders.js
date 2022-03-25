const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const listController = require("../controllers/listController")
// orders 되돌리기

router.post('/buy', orderController.buy);
router.post('/sell', orderController.sell);
router.post('/bank', orderController.deposit);
router.post('/withdraw', orderController.withdraw);
router.post('/signup', orderController.signup);
router.get('/buyapi', listController.buyapi);
router.get('/sellapi', listController.sellapi);

module.exports = router;