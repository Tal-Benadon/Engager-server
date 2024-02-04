// ייבוא הקונטרולר
const campaignController = require('../DL/controllers/campaign.controller');

async function getAllMsg(campaignId){
    return await msgController.read(campaignId)
}
async function addNewMsg(_id, body) {
campaignController.readOne(_id)

}


module.exports = {getAllMsg}