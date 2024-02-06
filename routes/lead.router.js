// ייבוא האקספרס
const express = require('express');
// הגדרת הראוטר בתוך האקספרס
const router = express.Router();
// ייבוא השירותים
const leadService = require('../BL/lead.service');
const auth = require("../auth")

// router.use(auth.checkToken)

// router.get("/:leadId", async (req, res) => {
//     try {
//         const lead = await leadService.getAllSentMsgs(req.params.leadId)
//         res.send(lead)
//     } catch (error) {
//         res.status(500).send("error occured", console.log(error))
//     }
// })

router.post('/', async (req, res) => {
    try {
        const data = req.body.data;
        const newLead = await leadService.addLeadToCamp(data);
        res.send(newLead)
    } catch (err) {
        res.status(400).send(err)
    }
})



// ייצוא הראוטר
module.exports = router;