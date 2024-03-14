const leadController = require("../DL/controllers/lead.controller");
const campaignController = require("../DL/controllers/campaign.controller");

// ADD A NEW LEAD TO A CAMP
async function addLeadToCamp(campId, data) {
  console.log("datainser", data);
  if (!data.phone || !data.fullName)
    throw { code: 500, msg: "User details are missing" };
  // TODO- check if phone is valid
  const campaign = await campaignController.readOne({ _id: campId });
  console.log("campin", campaign, campId);
  if (!campaign) throw { code: 404, msg: "Campaign not found" };

  const phoneIsExist = await campaign.leads.some(
    (lead) => lead.phone === data.phone
  );
  if (phoneIsExist)
    throw {
      code: 500,
      msg: "The lead is already registered for this campaign",
    };
  // Check if the lead is already registered for this campaign
  let mappedLead = {};

  mappedLead = {
    phone: String(data.phone),
    // lName: String(data.lName),
    // fName: String(data.fName),
    fullName: String(data.fullName),
    //  יש דרך יותר יפה? הדיפולט בסכמה לא עובד
    email: data.email ? String(data.email) : "",
    notes: data.notes ? String(data.notes) : "",
  };
  campaign.leads.push(mappedLead);
  await campaign.save();

  return mappedLead;
}

// TO UPDATE ONE LEAD IN A CAMP
async function updateLeadInCamp(campId, leadId, newData) {
  const campaign = await campaignController.readOne({ _id: campId });
  if (!campaign) throw { code: 500, msg: "phoneExist" };
  const leadIndex = campaign.leads.findIndex(
    (lead) => lead._id.toString() === leadId
  );
  if (leadIndex === -1) throw { code: 404, msg: "lead not found" };

  let filter = { _id: campId, "leads._id": leadId };

  let update = {
    $set: {},
  };
  // newData.fName && (update.$set[`leads.${leadIndex}.fName`] = newData.fName);
  // newData.lName && (update.$set[`leads.${leadIndex}.lName`] = newData.lName);
  newData.fullName && (update.$set[`leads.${leadIndex}.fullName`] = newData.fullName);
  newData.email && (update.$set[`leads.${leadIndex}.email`] = newData.email);
  newData.notes && (update.$set[`leads.${leadIndex}.notes`] = newData.notes);
  newData.phone && (update.$set[`leads.${leadIndex}.phone`] = newData.phone);

  return await campaignController.update(filter, update);
}

// TO DELETE LEAD FROM A SINGEL CAMP
async function delLeadFromCamp(campId, leadId) {
  const campaign = await campaignController.readOne({ _id: campId });
  if (!campaign) throw { code: 404, msg: "No campaign found" };
  const lead = campaign.leads.find((lead) => lead._id.toString() === leadId);
  if (!lead) throw { code: 404, msg: "No lead found" };
  lead.isActive = false;
  await campaign.save();
  return lead;
}

// TODO: delete Lead From All Camp
async function deleteLeadFromAllCamp(leadId) {}
// TODO: get LeadS From All Camps
async function getLeadFromAllCamps() {}

module.exports = {
  updateLeadInCamp,
  getLeadFromAllCamps,
  addLeadToCamp,
  delLeadFromCamp,
  deleteLeadFromAllCamp,
};
