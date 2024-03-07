const express = require("express");
const router = express.Router();
const campaignService = require('../BL/campaign/campaign.service');
const scheduleService = require('../BL/schedule.service');
const { scheduledJobs } = require("node-schedule");
const auth = require("../auth");

router.use(auth.checkClient)
//*************************************************************
// List of Full Rauts & details - 
// https://engager-g262.onrender.com/api-docs
//*************************************************************

// router.use(auth.checkToken)
//*************************************************************
// List of Full Rauts & details - 
// https://engager-g262.onrender.com/api-docs
//*************************************************************

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
 *         description: Bad request, This name already exists
 *       '500':
 *         description: Internal server error/something went wrong
 */

router.post('/', async (req, res) => {
  try {
    // {"campName":"camp1",{"user":{"_id":"65743643"}}}
    const userId = req.body.user._id;
    const body = req.body;
    const answer = await campaignService.createNewCampaign(userId, body);
    console.log("the answer is:  ", answer)
    res.send(answer);
  }
  catch (err) {
    console.log(err);
    // res.status(404).send(err.msg);
    res.status((err.code) || 404).send({ msg: err.msg || 'something went wrong' });

  }
})


//******update campeing */
router.put('/:campId', async (req, res) => {
  try {
    const campId = req.params.campId;
    const data = req.body.data
    const campeing = await campaignService.updateCampaign(campId, data)
    res.send(campeing)
  }
  catch (err) {
    res.status((err.code) || 500).send({ msg: err.msg || 'something went wrong' });

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
    // res.status(err.code).send(err.msg);
    res.status((err.code) || 500).send({ msg: err.msg || 'something went wrong' });
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


// Example usage
// const objectIdToCheck = '5f7a1e6b8f8a1e5e42823121';

// if (isValidObjectId(objectIdToCheck)) {
//   console.log('Valid ObjectId');
// } else {
//   console.log('Invalid ObjectId');
// }

// ניסיון ראשון - לא עבד
// function isValidObjectId(id) {
//   return ObjectId.isValid(id);
// }
router.get('/:campId', async (req, res) => {
  try {
    const campId = req.params.campId;
    // console.log("cr1 - campId" , campId );
    // console.log(isValidObjectId(campId));

    const campaign = await campaignService.getOneCamp(campId);
    res.send(campaign);
  } catch (err) {
    // res.status(err.code).send(err.msg);
    res.status((err.code) || 500).send({ msg: err.msg || 'something went wrong' });

  }
})



// מחיקת קמפיין
router.delete('/:campId', async (req, res) => {
  try {
    let deletedCamp = await campaignService.delCampaign(req.params.campId)
    res.send(deletedCamp);
  } catch (err) {
    // res.status(404).send(err.msg);
    res.status((err.code) || 404).send({ msg: err.msg || 'something went wrong' });

  }
})





module.exports = router;
