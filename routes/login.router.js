const express = require("express");
const router = express.Router();
const auth = require("../auth")

router.post("/login", async (req, res) => {
    try {
        const phone = req.body.phone
        const password = req.body.password
        const login = await auth.login(phone, password);
        res.send(login)

    } catch (err) {
        res.status(401).send("something went wrong");
    }
})