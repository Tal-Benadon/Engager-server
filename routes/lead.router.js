// ייבוא האקספרס
const express = require('express');
// הגדרת הראוטר בתוך האקספרס
const router = express.Router();
// ייבוא השירותים
const leadService = require('../BL/lead.service');

<<<<<<< HEAD
router.use(auth.checkClient)
=======
// router.get("/:leadId", async (req, res) => {
//     try {
//         const lead = await leadService.getAllSentMsgs(req.params.leadId)
//         res.send(lead)
//     } catch (error) {
//         res.status(500).send("error occured", console.log(error))
//     }
// })
>>>>>>> 956d3579921203f4366945c0290287dd4d669383

router.post('/', async (req ,res) => {
    try {
        const data = req.body.data;
        const newLead = await leadService.addLeadToCamp(data);
        res.send(newLead)
    } catch (err) {
        // res.status(400).send(err)
        res.status((err.code) || 400).send({msg: err.msg || 'something went wrong'});

    }
})



// ייצוא הראוטר
module.exports = router;