// ייבוא האקספרס
const express = require('express');
// הגדרת הראוטר בתוך האקספרס
const router = express.Router();
// ייבוא השירותים
const campaignService = require('../BL/campaign.service');


router.get('/:campaignId', async (req, res) => {
    try {
        const campaignId = req.params.campaignId; 
        const messages = await campaignService.getAllMsg(campaignId);
        res.send(messages);
    } catch (err) {
        res.status(err.code).send(err.msg);
    }
});



// ייצוא הראוטר
module.exports = router;