const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth")
// יצירת טוקן
router.post('/', async (req, res) => {
    try {
        res.send(await auth.createToken(req.body.campaign_id))
    } catch (error) {
        res.status(543).send(error.msg)
    }
})


// בדיקת טוקן ושליחה להוספת לייד
router.post('/:token', async (req, res) => {
    try {
        res.send(await auth.sendToAddLead(req.params.token, req.body))
    } catch (error) {
        if (error.msg) { res.status(543).send(error.msg) }
        else {
            res.status(543).send('there is a problem')
        }
    }
})

module.exports = router