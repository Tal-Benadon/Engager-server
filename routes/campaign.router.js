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

router.delete('/:idCamp/msg/:msgId', async (req, res) => {
  try {
    const idCamp = req.params.idCamp;
    const msgId = req.params.msgId;
    const del = await campaignService.delOneMessage(idCamp, msgId);
    res.send(del);
  }
  catch (err) {
    res.status(err.code).send(err.msg);
  }
})
router.get('/:idCamp', async (req, res) => {
    try {
      const id = req.params.idCamp
      const msgCampaigns = await campaignService.getAllMsg(id)
      res.send(msgCampaigns);
    }
    catch (err) {
      res.status(err.code).send(err.msg);
    }
  })

router.post("/:idCamp/msg", async (req, res) => {
  try {
    const id = req.params.idCamp;
    const msg = await campaignService.addNewMsg(id, req.body);
    res.send(msg);
  } catch (err) {
    res.status(err.code).send(err.msg);
  }
});

router.put("/:idCamp/msg/:msgId", async (req, res) => {
  try {
    const id = req.params.idCamp;
    const msgId = req.params.msgId;
req.body={...req.body,msgId}
    const msg = await campaignService.updateMsg(id, req.body);
    res.send(msg);
  } catch (err) {
    res.status(err.code).send(err.msg);
  }
});

// ייצוא הראוטר
module.exports = router;
