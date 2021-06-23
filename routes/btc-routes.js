const { Router } = require("express");
const controllers = require("../controllers/btc-controllers");

const btcRouter = Router();

btcRouter.get("/btcRate", controllers.getBtcRate);

module.exports = btcRouter;
