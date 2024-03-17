const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth")

router.post("/", async (req, res) => {
    try {
        const phone = req.body.phone
        const password = req.body.password
        const login = await auth.login(phone, password);

        res.send(login)

    } catch (err) {
        console.log(err)
        // res.status(401).send("something went wrong");
        res.status((err.code) || 401).send({msg: err.msg || 'something went wrong'});

    }
})




module.exports = router