const express = require("express");
const router = express.Router();
const campaignService = require('../BL/campaign.service');
const auth = require("../auth");

// router.use(auth.checkToken)

// TODO: לשלוף את המשתמש מהטוקן

/**###### Campeign ######*/
/**-Create a new campaign-VV---------------------------------------------- 
/**
 * @swagger
 * /campaigns/:
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
 *     responses:
 *       '200':
 *         description: Successfully created a new campaign
 *       '400':
 *         description: Bad request, check your payload
 *       '500':
 *         description: Internal server error
 */

router.post('/', async (req, res) => {
  try {
    const userId = req.body.user._id;
    const campName = req.body.campName;
    const answer = await campaignService.createNewCampaign(userId, campName);
    console.log("the answer is:  ", answer)
    res.send(answer);
  }
  catch (err) {
    res.status(err.code || 500).send({ msg: err.msg || 'something went wrong' });
  }
})

/** - Get all campaigns of user-VV---------------------------------------------------------------------
 * @swagger
 * /campaigns/{campaignId}: 
 *   get:
 *     summary: Get all campaigns of user
 *     tags: [Campaign]
 *     parameters:             
 *       - in: path             
 *         name: campaignId     
 *         schema:
 *           type: string       
 *         required: true       
 *         description: The ID of the campaign to retrieve
*/

router.get('/', async (req, res) => {
  try {
    const userId = req.body.user._id;
    const campaigns = await campaignService.getAllCampaignsByUser(userId)
    res.send(campaigns);
  }
  catch (err) {
    res.status(err.code || 500).send({ msg: err.msg || 'something went wrong' });
  }
})

/** - Get all massage in campagin -VV---------------------------------------------------------------------
 * @swagger
 * /campaigns/{campId}:
 *   get:
 *     summary: Get all messages in a campaign
 *     tags: 
 *       - Campaign
 *     parameters:
 *       - in: path
 *         name: campId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the campaign 
 *     responses:
 *       '200':
 *         description: Successful response
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Campaign not found
 */

router.get('/:campId', async (req, res) => {
  try {
    const campId = req.params.campId;
    const campaign = await campaignService.getOneCamp(campId);
    res.send(campaign);
  } catch (err) {
    res.status(err.code || 500).send({ msg: err.msg || 'something went wrong' });
  }
})



// מחיקת קמפיין
router.delete('/:campId', async (req, res) => {
  try {
    let deletedCamp = await campaignService.delCampaign(req.params.campId)
    res.send(deletedCamp);
  } catch (err) {
    res.status((err.code) || 500).send({ msg: err.msg || 'something went wrong' });
  }
})

//  ######## הודעות  ##########

// כל ההודעות של קמפיין בודד
router.get('/:campId/msg', async (req, res) => {
  try {
    const msgCampaigns = await campaignService.getAllMsg(req.params.campId)
    res.send(msgCampaigns);
  }
  catch (err) {
    res.status(err.code || 500).send({ msg: err.msg || 'something went wrong' });
  }
})

/**###### Message ######*/

// - add new msg into campaign --VV--------------------------------------------------------------------
/** 
* @swagger
* /campaigns/{campId}/msg:
*   post:
*     summary: Add a new message into a campaign
*     tags: [Message]
*     parameters:
*       - in: path
*         name: campId
*         required: true
*         schema:
*           type: string
*         description: The ID of the campaign to add a message to
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               message:
*                 type: string
*                 description: The content of the message to add
*             required:
*               - message
*     responses:
*       '200':
*         description: Message added successfully
*       '400':
*         description: Bad request, check your parameters
*       '404':
*         description: Campaign not found
*       '500':
*         description: Internal server error
*/

router.post('/:campId/msg/', async (req, res) => {
  try {
    const id = req.params.campId;
    const msg = await campaignService.addNewMsg(id, req.body);
    res.send(msg);
  } catch (err) {
    res.status(err.code).send(err.msg);
  }
});

//-Delete a message from a campaign-VV---------------
/**
 * @swagger
 * /campaigns/{campId}/msg/{msgId}:
 *   delete:
 *     summary: Delete a message from a campaign
 *     tags:
 *       - Message
 *     parameters:
 *       - in: path
 *         name: campId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the campaign from which to delete the message
 *       - in: path
 *         name: msgId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the message to delete
 *     responses:
 *       '200':
 *         description: Message deleted successfully
 *       '400':
 *         description: Bad request, check your parameters
 *       '404':
 *         description: Campaign or message not found
 *       '500':
 *         description: Internal server error
 */

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

// get singel messsag out of singel campaign ----------VV----------------
/**
 * @swagger
 * /campaigns/{campId}/msg/{msgId}:
 *   get:
 *     summary: get singel messsag out of singel campaign
 *     tags:
 *       - Message
 *     parameters:
 *       - in: path
 *         name: campId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the campaign
 *       - in: path
 *         name: msgId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the message to retrieve
 *     responses:
 *       '200':
 *         description: Message retrieved successfully
 *       '502':
 *         description: Bad gateway, internal server error
 */
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

//Get a specific message from a campaign ----VV-------------------------
/**
 * @swagger
 * /campaigns/{campId}/msg/{msgId}:
 *   get:
 *     summary: Get a specific message from a campaign
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: campId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the campaign from which to retrieve the message
 *       - in: path
 *         name: msgId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the message to retrieve
 *     responses:
 *       '200':
 *         description: Message retrieved successfully
 *       '404':
 *         description: Campaign or message not found
 *       '502':
 *         description: Internal server error
 */

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

// update single Message---VV---------
/**
 * @swagger
 * /campaigns/{campId}/msg/{msgId}:
 *   put:
 *     summary: update single Message
 *     tags:
 *       - Message
 *     parameters:
 *       - in: path
 *         name: campId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the campaign
 *       - in: path
 *         name: msgId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the message to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Message updated successfully
 *       '400':
 *         description: Bad request, check your parameters
 *       '404':
 *         description: Campaign or message not found
 *       '500':
 *         description: Internal server error
 */
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

//Delete a message from a campaign-VV-----------
/**
 * @swagger
 * /campaigns/{campId}/msg/{msgId}:
 *   delete:
 *     summary: Delete a message from a campaign
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: campId
 *         schema:
 *           type: string
 *         required: true
 *         description: MONGO _id of campaign
 *       - in: path
 *         name: msgId
 *         schema:
 *           type: string
 *         required: true
 *         description: MONGO _id of the message to delete
 *     responses:
 *       '200':
 *         description: Message deleted successfully
 *       '404':
 *         description: Campaign or message not found
 *       '500':
 *         description: Internal server error
 */

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

router.get('whatsapp/camp/:idCamp/msg/:msgId/leads', async (req, res) => {
  try {
    const idCamp = req.params.idCamp;
    const msgId = req.params.msgId;
    const msg = await campaignService.getArrLeadOfCamp(idCamp, msgId)
    res.send(msg);
  } catch (err) {
    res.status(err.code).send(err.msg);
  }
})


// delet lead
router.delete('/:idCamp/lead/:leadId', async (req, res) => {
  try {

    const idCamp = req.params.idCamp;
    const leadId = req.params.leadId
    const del = await campaignService.delLeadFromCamp(idCamp, leadId)
    res.send(del);
  } catch (err) {
    res.status(405).send(err.msg);
  }
})
// ייצוא הראוטר
module.exports = router;
