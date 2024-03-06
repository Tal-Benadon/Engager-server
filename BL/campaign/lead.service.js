const leadController = require("../../DL/controllers/lead.controller");
const campaignController = require("../../DL/controllers/campaign.controller");

async function addLeadToCamp(campId, data) {
}

async function updateLeadInCamp(campId,leadId, newData) {
}

async function delLeadFromCamp(capId, leadId) {
}

// async function getAllSentMsgs({ id_: leadId }) {
//     const lead = await leadController.getOne({ _id: leadId })
//     const thisLeadCampaigns = lead.campaigns.map(camp => {
//         campaignController.getOne({ _id: camp.campaign })
//     })
//     console.log(lead);
//     console.log(thisLeadCampaigns);
//     // return lead
// }

module.exports = { addLeadToCamp, updateLeadInCamp, addLeadToCamp, delLeadFromCamp };