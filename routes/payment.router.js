const express = require("express");
const router = express.Router();
const paymentService = require('../BL/payment.service')
const auth = require('../auth')
router.get('/', auth.checkClient, async (req, res) => {
try{
console.log(req.body);
    const pay = await paymentService.sendRequstToCardkom(req.body)
    res.send(pay);
}
catch(err){
    res.status(444).send(err.msg);
}


})

module.exports= router
