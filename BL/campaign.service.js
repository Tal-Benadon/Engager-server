// ייבוא הקונטרולר
const campaignController = require('../DL/controllers/campaign.controller');

async function createNewCampaign(userId, campName) {
    const nameIsExist = await campaignController.readOne({user: userId, title: campName});
    if (nameIsExist) throw {code: 404, msg: 'This name already exists'};
    const created = await campaignController.create({user: userId, title:campName, msg:[], leads:[]});
    if (!created) throw {code: 404, msg: 'campaign not created'};
    return (`${campName} campaign created!`,created)
}


async function getAllCampaignsByUser(userId) {
    // TODO: check if user exist 
    // if (!user) throw {code:404, msg:'no user'}
    const campaigns = await campaignController.read({user: userId})
    if (!campaigns) throw {code:404, msg: 'no campaigns for this user'}
    return campaigns;
}

async function delOneMessage(cmpId, msgId) {
    const campaign = campaignController.readOne(cmpId);
    if(!campaign) throw {code: 404, msg: 'id campaign not exist!'}
    const del = await campaignController.update({_id: cmpId}, {$pull: { msg: { _id: msgId}}});
    if (!del) throw {code: 404, msg: 'The deletion was not successful'}
    return 'deleted';
}



async function addNewMsg(_id, body) {
campaignController.readOne(_id)

}


module.exports = {getAllCampaignsByUser, delOneMessage, createNewCampaign}