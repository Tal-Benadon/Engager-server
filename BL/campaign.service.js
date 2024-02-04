// ייבוא הקונטרולר
const campaignController = require("../DL/controllers/campaign.controller");
require("dotenv").config();

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

// const starter=async()=>{

module.exports = { addNewMsg, updateMsg };
