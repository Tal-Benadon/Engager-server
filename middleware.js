// פונקציה לבדיקת טוקן בבקשות לקבלת מידע 

const userModel = require("./DL/models/user.model")

const checkClient = async (req, res, next) => {
    try {
        const token = req.header("authorization").replace("Bearer ", "")
        if (!token) throw ({ msg: "no token sent" })
        const payload = checkToken(token)
        const user = await userModel.findOne({ phone: payload.phone })
        if (!user) throw { msg: "not permitted" }
        req.user = user
        next()
    } catch (err) {
        res.status(401).send("Unauthorized")
    }
}

const checkToken = (token) => {

    const payload = jwt.verify(token, process.env.SECRET)
    return payload
}



module.exports = { checkClient }