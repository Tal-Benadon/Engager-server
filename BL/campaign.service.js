// ייבוא הקונטרולר
const campaignController = require('../DL/controllers/campaign.controller');

async function createNewCampaign(userId, campName) {
    campName = campName.trim();
    const nameIsExist = await campaignController.readOne({user: userId, title: campName});
    if (nameIsExist) throw {code: 404, msg: 'This name already exists'};
    const created = await campaignController.create({user: userId, title:campName});
    return created
}


async function getAllCampaignsByUser(userId) {
    const campaigns = await campaignController.read({user: userId});
    if (!campaigns.length) throw {code:404, msg: 'no campaigns for this user'}
    return campaigns;
}

async function delOneMessage(campId, msgId) {
    const campaign = campaignController.readOne({_id: campId});
    if(!campaign) throw {code: 480, msg: 'id campaign not exist!'};
    const del = await campaignController.update({_id: campId}, {$pull: {msg: {_id: msgId}}});
    if (!del) throw {code: 404, msg: 'The deletion was not successful'}
    return 'deleted';
}



async function addNewMsg(_id, body) {
campaignController.readOne(_id)

}


module.exports = {getAllCampaignsByUser, delOneMessage, createNewCampaign}