// ייבוא האקספרס
const express = require("express");
// הגדרת הראוטר בתוך האקספרס
const router = express.Router();
// ייבוא השירותים
const campaignService = require('../BL/campaign.service');

router.post('/', async (req, res) => {
  try {
    const userId = req.body.user._id;
    const campName = req.body.campName;
    const answer = await campaignService.createNewCampaign(userId, campName);
    res.send(answer);
  }
  catch (err) {
    res.status(err.code).send(err.msg);
  }
})

router.get('/:campaignId', async (req, res) => {
    try {
        const _id = req.params.campaignId; 
        const messages = await campaignService.getAllMsg(_id);
        res.send(messages);
    } catch (err) {
        res.status(err.code).send(err.msg);
    }
});
router.get('/', async (req, res) => {
  try {
    const userId = req.body.user._id;
    const campaigns = await campaignService.getAllCampaignsByUser(userId)
    res.send(campaigns);
  }
  catch (err) {
    res.status(err.code).send(err.msg);
  }
})

router.delete('/:campId/msg/:msgId', async (req, res) => {
  try {
    const campId = req.params.campId;
    const msgId = req.params.msgId;
    const del = await campaignService.delOneMessage(campId, msgId);
    res.send(del);
  }
  catch (err) {
    res.status(err.code).send(err.msg);
  }
})



router.post("/msg/:msgId", async (req, res) => {
  try {
    const id = req.params.msgId;
    const msg = await campaignService.addNewMsg(id, req.body);
    res.send(msg);
  } catch (err) {
    res.status(err.code).send(err.msg);
  }
});

router.put("/msg/:msgId", async (req, res) => {
  try {
    const id = req.params.msgId;

    const msg = await campaignService.updateMsg(id, req.body);
    res.send(msg);
  } catch (err) {
    res.status(err.code).send(err.msg);
  }
});

// ייצוא הראוטר
module.exports = router;
