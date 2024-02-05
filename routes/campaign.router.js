const express = require("express");
const router = express.Router();
const campaignService = require('../BL/campaign.service');


/**------------------------------------------------
 * @swagger
* tags:
 *   name: Campaign
 *   description: Operations related to campaigns
 * 
 * /campaigns:
 *   post:
 *     summary: Create a new campaign
 *     tags: [Campaign]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *               campName:
 *                 type: string
*/

// TODO: לשלוף את המשתמש מהטוקן


// ###### קמפיינים ######

// הוספת קמפיין
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

/** -----------------------------------------------------------------------
 * @swagger
 * /campaigns/{campaignId}:      
 *   get:
 *     summary: Get messages for a specific campaign
 *     tags: [Campaign]
 *     parameters:             
 *       - in: path             
 *         name: campaignId     
 *         schema:
 *           type: string       
 *         required: true       
 *         description: The ID of the campaign to retrieve
*/

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

module.exports = router;
