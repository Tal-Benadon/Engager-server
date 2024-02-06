// ייבוא הקונטרולר
const campaignController = require("../DL/controllers/campaign.controller");

async function createNewCampaign(userId, campName) {
  console.log(userId, campName);
  campName = campName.trim();
  const nameIsExist = await campaignController.readOne({ user: userId, title: campName });
  console.log(nameIsExist);
  if (nameIsExist) throw { code: 404, msg: 'This name already exists' };
  const created = await campaignController.create({ user: userId, title: campName });
  return created
}


async function getAllCampaignsByUser(userId) {
  const campaigns = await campaignController.read({ user: userId });
  if (!campaigns.length) throw { code: 404, msg: "no campaigns for this user" };
  return campaigns;
}
async function delCampaign(campId) {
  const campaign = campaignController.readOne({ _id: campId });
  if (!campaign) throw { code: 480, msg: "id campaign not exist!" };
  if (campaign.isActive == false) throw { code: 481, msg: " campaign alredy deleted!" };
  return await campaignController.update({ _id: campId }, { isActive: false })
}
async function delOneMessage(campId, msgId) {
  const campaign = campaignController.readOne({ _id: campId });
  if (!campaign) throw { code: 480, msg: "id campaign not exist!" };
  return await campaignController.update(
    { _id: campId },
    { $pull: { msg: { _id: msgId } } }
  );
}

async function addNewMsg(id, body) {
  if (!body.subject) throw { code: 404, msg: "not message subject" };
  if (!body.content) throw { code: 404, msg: "not message content" };
  let campaign = await campaignController.readOne({ _id: id });
  if (!campaign) throw "not campaign";
  let filter = { _id: id };

  let messages = {
    subject: body.subject,
    content: body.content,
  };
  console.log("on service the req body:  ", messages);
  return await campaignController.update(filter, { $push: { msg: messages } });
}



async function updateMsg(id, body) {
  let campaign = await campaignController.readOne({ _id: id });

  if (!campaign) throw "not campaign";
  let filter = { _id: id, "msg._id": body._id };

  let update = {
    $set: {},
  };
  if (body.subject) {
    update.$set["msg.$.subject"] = body.subject;
  }

  if (body.content) {
    update.$set["msg.$.content"] = body.content;
  }

  if (!body.content && !body.subject)
    throw { code: 403, msg: "non a text for update" };
  return await campaignController.update(filter, update);
}

async function getAllMsg(id) {
  const messages = await campaignController.read({ _id: id }, "msg");
  return messages;
}
async function getOneMsg(campId, msgId) {
  // console.log("msgid is:", msgId);  
  let campaigns = await getAllMsg(campId)
  let campaign = campaigns[0]
  if (campaigns.length < 1) throw "no messeges in this campaign";//lhneh
  let mssg = campaign.msg
  if (!mssg) throw "messege not exist"
  return mssg.find(m => m._id == msgId)
}

//לבדוק אחרי שאריה מעלה להוציא מערך שם ומספר טלפון שליחת הודעה לכל הלידים בקמפיין מסויים
async function getArrLeadOfCamp(capId, msgId) {
  if (!capId) throw { code: 404, msg: "No campaign found" };
  if (!msgId) throw { code: 404, msg: "No msg found" };
  let sendMsg = await getOneMsg(capId, msgId);
  if (!sendMsg) throw { code: 404, msg: "This msg to send" }
  let campaign = await campaignController.readOne({ _id: capId });
  const arrNew = campaign["leads"];
  if (!arrNew) throw { code: 404, msg: "No lead found" };
  const list = arrNew.map((l) => {
    if (l.isActive) {
      return {
        phone: l["lead"].phone,
        name: l["lead"].name,
        email: l["lead"].email,
        _id: l["lead"]._id,
      };
    }
  });
  finalArray = { leads: list, msg: sendMsg };
  return finalArray
}

async function updateMsgStatus(capId, msgId) {

}

async function getOneCamp(campId) {
  const campaign = await campaignController.readOne({ _id: campId })
  console.log('camp from service', campaign);
  return campaign
}

async function pushAllCampaignLeadsToMsgLeads(campaignId, targetMsgId) {
  try {
    const campaignToUpdate = await campaignController.readOne({ _id: campaignId });


    const leadIds = campaignToUpdate.leads.map(lead => ({ lead: lead._id }));
    console.log(leadIds);

    const targetMsg = campaignToUpdate.msg.find(msg => msg._id.equals(targetMsgId));
    console.log(targetMsg);

    if (targetMsg) {

      targetMsg.leads = [...targetMsg.leads, ...leadIds];


      await campaignToUpdate.save();

      console.log("Leads pushed to target message successfully");
    } else {
      console.error("Target message not found in the campaign");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}


module.exports = {
  addNewMsg,
  updateMsg,
  getAllCampaignsByUser,
  delOneMessage,
  createNewCampaign,
  getAllMsg,
  getArrLeadOfCamp,
  getOneMsg,
  delCampaign,
  getAllMsg,
  // sendMsgForCampaign
  getOneCamp
};
