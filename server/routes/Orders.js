const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const listController = require("../controllers/listController");
const conlistController = require("../controllers/conlistController")
// orders 되돌리기


router.post("/trans", orderController.trans)
router.post('/bank', orderController.deposit);
router.post('/withdraw', orderController.withdraw);
router.post('/balance/', orderController.balance);

router.post('/signup', orderController.signup);
router.get('/buyapi', listController.buyapi);
router.get('/sellapi', listController.sellapi);
router.get("/conclude", conlistController.conclude)
router.get("/highprice", conlistController.highprice)
router.get("/lowprice", conlistController.lowprice)
router.get("/totalquantity", conlistController.totalquantity)
router.get("/currentprice", conlistController.currentprice)
router.get("/currentprice2", conlistController.currentprice2)

module.exports = router;