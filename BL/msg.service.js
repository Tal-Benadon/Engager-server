const campaignController = require("../DL/controllers/campaign.controller");
const { io } = require("socket.io-client");
const socket1 = io("http://localhost:3000"); // ?
const { isValidObjectId } = require("./functions");

// To delete msg from campaign
async function delOneMessage(campId, msgId) {
  return await campaignController.updateOne(
    { _id: campId, "msg._id": msgId },
    { $set: { "msg.$.isActive": false } }
  );
}

//To add a new msg
async function addNewMsg(id, body) {
  if (!isValidObjectId(id)) throw { code: 401, msg: "inValid _id" };
  if (!body.subject) throw { code: 420, msg: "message without subject" };
  if (!body.content) throw { code: 421, msg: "message without content" };
  let campaign = await campaignController.readOne({ _id: id });
  if (!campaign) throw { code: 480, msg: "id campaign not exist!" };
  let filter = { _id: id };

  let messages = {
    subject: body.subject,
    content: body.content,
  };
  return await campaignController.update(filter, { $push: { msg: messages } });
}

//To update a msg
async function updateMsg(campId, msgId, body) {
  console.log("***in msg");
  if (!isValidObjectId(campId)) throw { code: 401, msg: "inValid _id" };

  let campaign = await campaignController.readOne({ _id: campId });
  console.log(" S ", campaign);
  if (!campaign) throw { code: 480, msg: "campaign is not exist!" };
  const msgIndex = campaign.msg.findIndex((msg) => {
    return msg._id.toString() === msgId;
  });
  console.log("msgIndex", msgIndex);
  if (msgIndex === -1) {
    throw { code: 404, msg: "msg not found" };
  }
  let filter = { _id: campId, "msg._id": msgId };
  let update = {
    $set: {},
  };

  if (body.subject) {
    update.$set[`msg.${msgIndex}.subject`] = body.subject;
  }
  if (body.content) {
    update.$set[`msg.${msgIndex}.content`] = body.content;
  }
  console.log("body***",body.subject );
  if (!body.content && !body.subject) throw { code: 403, msg: "non a text for update" };

  let result = await campaignController.update(filter, update);
  console.log("res", result);
  return result;
}

// To get all messages of a specific campaign
async function getAllMsg(id) {
  if (!isValidObjectId(id)) throw { code: 401, msg: "inValid _id" };
  const campaign = await campaignController.readOne({ _id: id });

  if (!campaign) throw { code: 480, msg: "id campaign not exist!" };
  const messages = await campaignController.read(
    { _id: id, isActive: true },
    "msg"
  );
  return messages;
}

// To get just one msg
async function getOneMsg(campId, msgId) {
  if (!isValidObjectId(campId)) throw { code: 401, msg: "inValid _id" };
  if (!isValidObjectId(msgId)) throw { code: 401, msg: "inValid _id" };

  let camp = await campaignController.readOne({
    _id: campId,
    "msg._id": msgId,
  });
  if (!camp) throw { msg: "no messeges in this campaign", code: 404 };

  return camp.msg.find((m) => m._id == msgId);
}

async function updateMsgStatus(capId, msgId, status) {
  if (!isValidObjectId(capId)) throw { code: 401, msg: "inValid camp_id" };
  if (!isValidObjectId(msgId)) throw { code: 401, msg: "inValid msg_id" };
  let msgOne = await getOneMsg(capId, msgId);
  if (!msgOne) throw "not msg";
  let filter = { _id: id, "msg._id": msgId };

  if (status !== "created" || status !== "read" || status !== "sent")
    throw "dont know the status";

  return campaignController.update(filter, $set("status", status));
}

module.exports = {
  delOneMessage,
  addNewMsg,
  updateMsg,
  getAllMsg,
  updateMsgStatus,
};
