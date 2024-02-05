const express = require("express");
const router = express.Router();
const campaignService = require('../BL/campaign.service');

// TODO: לשלוף את המשתמש מהטוקן


// ###### קמפיינים ######

// הוספת קמפיין
router.post('/', async (req, res) => {
  try {
    const userId = req.body.user._id;
    const campName = req.body.campName;
    const answer = await campaignService.createNewCampaign(userId, campName);
    res.send(answer);
  }
  catch (err) {
    res.status(500).send(err.msg);
  }
})

// כל הקמפיינים של לקוח
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

// כל ההודעות של קמפיין בודד
router.get('/:campId', async (req, res) => {
  try {
    const msgCampaigns = await campaignService.getAllMsg(req.params.campId)
    res.send(msgCampaigns);
  }
  catch (err) {
    res.status(err.code).send(err.msg);
  }
});


//  ######## הודעות  ##########


// add new msg into campaign
// 2500
router.post('/:campId/msg/', async (req, res) => {
  try {
    const id = req.params.campId;
    const msg = await campaignService.addNewMsg(id, req.body);
    res.send(msg);
  } catch (err) {
    res.status(err.code).send(err.msg);
  }
});

// מחיקת הודעה
router.delete('/:campId/msg/:msgId', async (req, res) => {
  try {
    const idCamp = req.params.campId;
    const msgId = req.params.msgId;
    const del = await campaignService.delOneMessage(idCamp, msgId);
    res.send(del);
  }
  catch (err) {
    res.status(err.code).send(err.msg);
  }
})

// get singel msg out of singel campaign
router.get('/:campId/msg/:msgId', async (req, res) => {
  try {
    const campId = req.params.campId;
    const msgId = req.params.msgId;
    const msg = await campaignService.getOneMsg(campId, msgId);
    console.log("the msg that return is:  ", msg);
    res.send(msg);
  }
  catch (err) {
    res.status(502).send(err.msg);
  }
})

// update single msg
router.put("/:campId/msg/:msgId", async (req, res) => {
  try {
    const id = req.params.campId;
    const msgId = req.params.msgId;
    req.body = { ...req.body, msgId }
    const msg = await campaignService.updateMsg(id, req.body);
    res.send(msg);
  } catch (err) {
    res.status(err.code).send(err.msg);
  }
});

// קבלת קמפיין מסוים
router.get('/hotam/:campId', async (req, res) => {
  try{
    const campId = req.params.campId;
    const campaign = await campaignService.getOneCamp(campId);
    res.send(campaign);
  } catch (err) {
    res.status(err.code).send(err.msg);
  }
})


// ייצוא הראוטר
module.exports = router;
