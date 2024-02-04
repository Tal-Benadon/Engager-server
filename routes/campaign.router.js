// ייבוא האקספרס
const express = require('express');
// הגדרת הראוטר בתוך האקספרס
const router = express.Router();
// ייבוא השירותים
const campaignService = require('../BL/campaign.service');

router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const campaigns = await campaignService.getAllCampaignsByUser(userId)
        res.send(campaigns);
    }
    catch (err) {
        res.status(err.code).send(err.msg);
    }
})

router.delete('/:msgId', async (req, res) => {
    try{
        const msgId = req.params.msgId;
        const del = await campaignService.delOneMessage(msgId);
        res.send(del);
    }
    catch (err) {
        res.status(err.code).send(err.msg);
    }
})






// ייצוא הראוטר
module.exports = router;