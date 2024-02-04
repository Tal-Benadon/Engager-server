// ייבוא הקונטרולר
const campaignController = require('../DL/controllers/campaign.controller');

async function getAllCampaignsByUser(userId) {
    // TODO: check if user exist 
    // if (!user) throw {code:404, msg:'no user'}
    const campaigns = await campaignController.read({_id: userId})
    if (!campaigns) throw {code:404, msg:'no campaigns for this user'}
    return campaigns;
}

async function delOneMessage(msgId) {
    // const msg = await campaignController.read({_id: msgId});
    // if (!msg) throw {}
    const del = await campaignController.del({_id: msgId})
    if (!del) throw {code: 404, msg: 'The deletion was not successful'}
    return del;

}





module.exports = {getAllCampaignsByUser, delOneMessage}