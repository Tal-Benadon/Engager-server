const express = require("express");
const router = express.Router();
const paymentService = require('../BL/payment.service')

router.get('/', async (req, res) => {
try{
console.log("*****");
    const pay = await paymentService.sendRequstToCardkom(req.body)
    res.send(pay);
}
catch(err){
    res.status(444).send(err.msg);
}


})

module.exports= router
