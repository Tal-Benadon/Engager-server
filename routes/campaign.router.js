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
console.log("the req is:  " ,userId,campName);
    const answer = await campaignService.createNewCampaign(userId, campName);
    console.log("the answer is:  ", answer)
    res.send(answer);
  }
  catch (err) {
    res.status(404).send(err.msg);
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

// קמפיין בודד
router.get('/:campId', async (req, res) => {
  try {
    const msgCampaigns = await campaignService.getAllMsg(req.params.campId)
    res.send(msgCampaigns);
  }
  catch (err) {
    res.status(err.code).send(err.msg);
  }
})
// מחיקת קמפיין
router.delete('/:campId',async(req,res)=>{
try{
 let deletedCamp =  await campaignService.delCampaign(req.params.campId)
 res.send(deletedCamp);
}catch(err){
  res.status(404).send(err.msg);
}
})

//  ######## הודעות  ##########


// add new msg into campaign
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

router.delete('/:campId/msg/:msgId', async (req, res) => {
  try {
    const idCamp = req.params.campId;
    const msgId = req.params.msgId;
    const msg = await campaignService.sendMsgForCampaign(idCamp, msgId)
    res.send(msg);

  } catch (err) {
    res.status(err.code).send(err.msg);
  }

})

// ייצוא הראוטר
module.exports = router;
