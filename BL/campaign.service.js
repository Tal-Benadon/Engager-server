// ייבוא הקונטרולר
const campaignController = require("../DL/controllers/campaign.controller");
const {io}= require('socket.io-client')
const socket1 = io('http://localhost:3000')

async function createNewCampaign(userId, campName) {
  console.log(userId, campName);
  campName = campName.trim();
  const nameIsExist = await campaignController.readOne({ user: userId, title: campName });
  console.log(nameIsExist);
  if (nameIsExist) throw { code: 501, msg: 'Campain whith this name is already exists. try again' };
  const created = await campaignController.create({ user: userId, title: campName });
  return created
}


async function getAllCampaignsByUser(userId) {
  const user = campaignController.readOne({ _id: userId });
  if (!user.length) throw { code: 404, msg: "user is not exist" };
  const campaigns = await campaignController.read({ user: userId });
  if (!campaigns.length) throw { code: 402, msg: "no campaigns for this user" };
  return campaigns;
}
async function delCampaign(campId){
  const campaign = campaignController.readOne({ _id: campId });
  if (!campaign) throw { code: 404 , msg: "Campaign is not exist!" };
    return await campaignController.update({ _id: campId }, {isActive: false})
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
console.log("on service the req body:  ",messages);
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
async function getOneMsg(campId,msgId){
  // console.log("msgid is:", msgId);  
  let campaigns = await getAllMsg(campId)
  let campaign = campaigns[0]
    if (campaigns.length<1) throw "no messeges in this campaign";//lhneh
let mssg =   campaign.msg
    if (!mssg) throw ({msg: "messege not exist", code: 404})
    return mssg.find(m=>m._id == msgId)
}

//לבדוק אחרי שאריה מעלה להוציא מערך שם ומספר טלפון שליחת הודעה לכל הלידים בקמפיין מסויים
async function getArrLeadOfCamp(capId, msgId) {
    if (!capId) throw { code: 404, msg: "No campaign found" };
    if (!msgId) throw { code: 404, msg: "No msg found" };
  let sendMsg= await getOneMsg(capId, msgId);
  if(!sendMsg) throw {code: 404, msg: "This msg to send"}
  let campaign = await campaignController.readOne({ _id: capId });
  const arrNew = campaign["leads"];
  if(!arrNew) throw  { code: 404, msg: "No lead found" };
  const list = arrNew.map((l) => {
    if (l.isActive) {
     
     const data ={
      phone: l["lead"].phone,
      name: l["lead"].name,
      _id: l["lead"]._id,
      msg: sendMsg.content
     }
     socket1.emit('data',data)
      return {
        phone: l["lead"].phone,
        name: l["lead"].name,
        email: l["lead"].email,
        _id: l["lead"]._id,
      };
    }
  });
  finalArray = {leads:list, msg: sendMsg };
  return  finalArray 
}
// לקשר לפונקציה של טל שמכניסה לידים לmsg
async function updateMsgStatus(capId, msgId , status){
let msgOne= await getOneMsg(capId, msgId )
if (!msgOne) throw "not msg";
let filter = { _id: id, "msg._id": msgId };

if (status !== "created" || status !== "read" || status !== "sent")throw "dont know the status"

return campaignController.update(filter , $set('status',status))

}

async function getOneCamp(campId) {
  const campaign = await campaignController.readOne({_id:campId})
   if (!campaign) throw ({msg: "Campaign is not exist", code: 404})
  return campaign
}

async function delLeadFromCamp(capId, leadId){
  if (!capId) throw { code: 404, msg: "No campaign found" };
  if (!leadId) throw { code: 404, msg: "No lead found" };
  const updateIsActiv = await campaignController.updateOne(
    { "leads.lead": leadId },
    { $set: { "leads.$.isActive": false } }
);

return updateIsActiv

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
  getOneCamp,
  updateMsgStatus,
  delLeadFromCamp
};
