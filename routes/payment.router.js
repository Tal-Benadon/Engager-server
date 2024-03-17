const express = require("express");
const router = express.Router();
const paymentService = require('../BL/payment.service')
const auth = require('../middlewares/auth')
router.get('/',  async (req, res) => {
try{
    const pay = await paymentService.sendRequstToCardkom(req.body["user"])
    res.send(pay);
}
catch(err){
    res.status(444).send(err.msg);
}


})

module.exports= router
