const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth")
// יצירת טוקן
router.post('/', async (req, res) => {
    try {
        res.send(await auth.createToken(req.body.campaign_id, req.body.user_id))
    } catch (error) {
        console.log(error);
        res.status(543).send(error.msg)
    }
})



router.post('/', async (req, token, res) => {
    const payload = jwt.verify(token, process.env.SECRET);
    const userId = payload.userId
    const campId = payload.campId


})

module.exports = router

