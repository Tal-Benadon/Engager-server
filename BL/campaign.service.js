// ייבוא הקונטרולר
const campaignController = require('../DL/controllers/campaign.controller');

async function getAllMsg(_id){
    return await msgController.read(_id)
}
async function addNewMsg(_id, body) {
campaignController.readOne(_id)

}


module.exports = {getAllMsg, addNewMsg}