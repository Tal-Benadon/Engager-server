// ייבוא הקונטרולר
const campaignController = require('../DL/controllers/campaign.controller');

async function getAllMsg(campaignId){
    return await msgController.read(campaignId)
}





module.exports = {getAllMsg}