// ייבוא האקספרס
const express = require('express');
// הגדרת הראוטר בתוך האקספרס
const router = express.Router();
// ייבוא השירותים
const leadService = require('../BL/campaign/lead.service');
// const auth = require('../auth')

// router.use(auth.checkClient)
// router.get("/:leadId", async (req, res) => {
//     try {
//         const lead = await leadService.getAllSentMsgs(req.params.leadId)
//         res.send(lead)
//     } catch (error) {
//         res.status(500).send("error occured", console.log(error))
//     }
// })

router.post('/:campId', async (req ,res) => {
    try {
        console.log("in rou");
        const campId= req.params.campId
        const data = req.body.data;
        console.log(data, campId);
        const newLead = await leadService.addLeadToCamp(campId, data);
        res.send(newLead)
    } catch (err) {
        // res.status(400).send(err)
        console.error(err);
        res.status((err.code) || 400).send({msg: err.msg || 'something went wrong'});
    }
})
//Update a lead by ID -------------------------------------------
/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a lead by ID
 *     description: Update an existing lead identified by its ID.
 *     tags:
 *       - Lead
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the lead to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties expected in the request body
 *     responses:
 *       '200':
 *         description: Successfully updated the lead
 *       '400':
 *         description: Bad request. Missing or invalid data provided.
 *       '404':
 *         description: Lead not found
 *       '500':
 *         description: Internal server error
 */
 
router.put('/:campId/lead/:leadId', async (req ,res) => {
    try {
        const campId= req.params.campId
        const leadId= req.params.leadId
        const newData= req.body.data
        res.send(await leadService.updateLeadInCamp(campId, leadId, newData ))
    } catch (err) {
        res.status(400).send(err.msg)
    }
})



// ייצוא הראוטר
module.exports = router;