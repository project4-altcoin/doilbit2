const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post('/buy', orderController.buy);
router.post('/sell', orderController.sell);
router.post('/bank', orderController.deposit);
router.post('/withdraw', orderController.withdraw);

router.post('/signup', orderController.signup);

module.exports = router;