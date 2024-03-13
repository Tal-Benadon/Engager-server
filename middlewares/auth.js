// TODO:
// 1. auth - basic user
// 2. auth - admin
// 3. move login func to _______

const jwt = require("jsonwebtoken")
const userService = require('../BL/account.service');
const campaignController = require('../DL/controllers/campaign.controller')
const leadService = require('../BL/lead.service')


//LOGIN
async function login(phone, password) {
    const user = await userService.getOneUser(phone)
    if (password != user.password) throw "The password incorrect"
    //  הפקת טוקן בכניסה
    const token = jwt.sign({ phone: phone }, process.env.SECRET, { expiresIn: "7d" })
    return {token,user}
}

// פונקציה לבדיקת טוקן בבקשות לקבלת מידע 
const userModel = require("../DL/models/user.model")

const checkClient = async (req, res, next) => {
    try {
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA1NTk2MTk0MTMiLCJpYXQiOjE3MDcyOTY1MTksImV4cCI6MTcwNzkwMTMxOX0.9UKZmT-bI8eEpOGD5HJDLtfK6DBkdDn1pR85U9x2LKY"
        // const token = req.header("authorization")
        // if (!token) throw ({ msg: "no token sent" })
        // const payload = checkToken(token)
        // const user = await userModel.findOne({ phone: payload.phone })
        // if (!user) throw { msg: "not permitted" }
        const user = {
            _id: "65ed9c525b51ed6b4bd16107"
        }
        req.body.user = user
        next()
    } catch (err) {
        res.status(401).send("Unauthorized")
    }
}



// const checkToken = (token) => {
//     const payload = jwt.verify(token, process.env.SECRET)
//     return payload
// }


// יצירת טוקן
const createToken = async (campaignId, userId) => {
    const campaign = await campaignController.read({ _id: campaignId })
    if (!campaign) throw { msg: 'campaign not found' }
    let token = jwt.sign({ campaignId, userId }, process.env.SECRET)
    return token
}

// בדיקת טוקן 
const checkToken = async (token) => {
    try {
        const approval = jwt.verify(token, process.env.SECRET)
        if (!approval) throw { msg: 'token is not valid' }
        const campaign = await campaignController.read({_id : approval.userId},{ _id: approval.campaignId })
        if (!campaign) throw { msg: 'campaign not found' }
        
        return approval
    } catch (error) {
        return error
    }
}


// שליחה להוספת לייד
const sendToAddLead = async (token, data) => {
    let res = await checkToken(token)
   const {campaignId , userId} = res 
    return 'the lede create' +  await leadService.addLeadToCamp( campaignId , userId, data.data)
}
module.exports = { createToken, sendToAddLead, login, checkClient }

