const jwt = require("jsonwebtoken")
async function login(phone, password) {
    const user = await userService.getOneUser(phone)
    if (password != user.password) {
        throw "The password incorrect"
    }
    //  הפקת טוקן בכניסה
    const token = jwt.sign(phone, process.env.SECRET, { expiresIn: "7d" })
    return token
}



module.exports = { login }