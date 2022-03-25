const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const listController = require("../controllers/listController")

router.post('/buy', orderController.buy);
router.post('/sell', orderController.sell);
router.post('/bank', orderController.bank);
router.get("/buyapi", listController.buyapi);
router.get("/sellapi", listController.sellapi);

module.exports = router;