// ייבוא הקונטרולר
const campaignController = require('../DL/controllers/campaign.controller');

async function addNewMsg(id, body) {
let campain= await campaignController.readOne(_id)
if(!campain)throw "not campaign"
let filter= {_id :id}

if (!body.subject)throw  {code: 404 ,msg : "not message subject"} 
if (!body.content)throw {code: 404 ,msg : "not message content"} 

let messages =  {
    subject: body.subject ,
    content : body.content,
}
return await campaignController.updateOne({_id : id}, { $push: { msg: messages } }) 

}



module.exports = {}