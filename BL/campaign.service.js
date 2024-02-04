// ייבוא הקונטרולר
const campaignController = require("../DL/controllers/campaign.controller");

async function createNewCampaign(userId, campName) {
  campName = campName.trim();
  const nameIsExist = await campaignController.readOne({
    user: userId,
    title: campName,
  });
  if (nameIsExist) throw { code: 404, msg: "This name already exists" };
  const created = await campaignController.create({
    user: userId,
    title: campName,
  });
  return created;
}

async function getAllCampaignsByUser(userId) {
  const campaigns = await campaignController.read({ user: userId });
  if (!campaigns.length) throw { code: 404, msg: "no campaigns for this user" };
  return campaigns;
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

  return await campaignController.update(filter, { $push: { msg: messages } });
}

// addNewMsg(id, body)

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


module.exports = {
  addNewMsg,
  updateMsg,
  getAllCampaignsByUser,
  delOneMessage,
  createNewCampaign,
  getAllMsg,
};
