const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth")
// יצירת טוקן
router.post('/', async (req, res) => {
    try {
        constId= req.body.campaign_id + req.body.user_id 
        res.send(await auth.createToken(constId))
    } catch (error) {
        console.log(error);
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

router.post('/', async (req,token, res)=>{
    const payload = jwt.verify(token, process.env.SECRET);
    const userId= payload.userId
    const campId = payload.campId


})

module.exports = router

