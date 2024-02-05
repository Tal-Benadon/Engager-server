// ייבוא האקספרס
const express = require("express");
// הגדרת הראוטר בתוך האקספרס
const router = express.Router();
// ייבוא השירותים
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
router.delete('/:idCamp/msg/:msgId', async (req, res) => {
    try {
        const idCamp = req.params.idCamp;
        const msgId = req.params.msgId;
        const msg = await campaignService.sendMsgForCampaign(idCamp ,msgId )
        res.send(msg);

    } catch (err) {
        res.status(err.code).send(err.msg);
      }

})

// ייצוא הראוטר
module.exports = router;
