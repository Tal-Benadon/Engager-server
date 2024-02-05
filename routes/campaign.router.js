// ייבוא האקספרס
const express = require("express");
// הגדרת הראוטר בתוך האקספרס
const router = express.Router();
// ייבוא השירותים
const campaignService = require('../BL/campaign.service');


router.post('/', async (req, res) => {
  try {
    const userId = req.body._id;
    const campName = req.body.campName;
   
    const answer = await campaignService.createNewCampaign(userId, campName);
    res.send(answer);
  }
  catch (err) {
    res.send(err.msg);
  }
})

// router.post('/', async (req, res) => {
//   try {
//     const answer = await campaignService.createNewCampaign(req.body.campName);
//     res.send(answer);
//   }
//   catch (err) {
//     res.status(err.code).send(err.msg);
//   }
// })


// get all campaigns of single user
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

// delete singel msg out of singel campaign 
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

// get singel campaign
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

// get singel msg out of singel campaign
router.get('/:campId/msg/:msgId', async (req, res) => {
  try {
    const campId = req.params.campId;
    const msgId = req.params.msgId;
    const msg = await campaignService.getOneMsg(campId, msgId);
    console.log("the msg that return is:  ", msg );
    res.send(msg);
  }
  catch (err) {
    res.status(502).send(err.msg);
  }
})

// add new msg into campaign
router.post('/:idCamp/msg/', async (req, res) => {
  try {
    console.log(req.params.idCamp);
    const id = req.params.idCamp;
    console.log("the campaign id is:  ", id);
    const msg = await campaignService.addNewMsg(id, req.body);
    console.log("the new msg is", msg );
    res.send(msg);
  } catch (err) {
    res.status(err.code).send(err.msg);
  }
});

// update single msg
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
