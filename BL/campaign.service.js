// ייבוא הקונטרולר
const campaignController = require('../DL/controllers/campaign.controller');

async function getAllMsg(){
    return await msgController.read(campainName)
}





module.exports = {getAllMsg}