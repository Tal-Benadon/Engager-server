const jwt = require("jsonwebtoken")
async function login(phone, password) {
    const user = await userService.getOneUser(phone)
    if (password != user.password) {
        throw "The password incorrect"
    }
    //  הפקת טוקן בכניסה
    const token = jwt.sign(phone, process.env.SECRET, { expiresIn: "24h" })
    return token
}

// פונקציה לבדיקת טוקן בבקשות לקבלת מידע 

function checkToken(req, res, next) {
    const token = req.header("authorization").replace("Bearer ", "")
    try {
        jet.verify(token, process.env.SECRET)
    } catch (err) {
        res.status(401).send("Unauthorized")
    }
}