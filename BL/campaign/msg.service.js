
async function delOneMessage(campId, msgId) {

      return await campaignController.updateOne(
        { _id: campId, 'msg._id': msgId },
        { $set: { 'msg.$.isActive': false } },
      )
  

  }

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

  async function updateMsg(campId, body) {
    console.log("***in msg");
    if (!isValidObjectId(campId)) throw { code: 401, msg: "inValid _id" };
  
    let campaign = await campaignController.readOne({ _id: campId });
    if (!campaign) throw { code: 480, msg: "campaign is not exist!" };
    const msgIndex = campaign.msg.findIndex(msg => {
      return msg._id.toString() === body.msgId
    });
    if (msgIndex === -1) {
      throw { code: 404, msg: "msg not found" }
    }
    let filter = { _id: id, "msg._id": body.msgId };
    let update = {
      $set: {},
    };
  
    if (body.subject) {
  
      update.$set[`msg.${msgIndex}.subject`] = body.subject;
    }
    if (body.content) {
      update.$set[`msg.${msgIndex}.content`] = body.content;
    }
    if (!body.content || !body.subject)
  
      throw { code: 403, msg: "non a text for update" };
    return await campaignController.update(filter, update);
  }

  async function getAllMsg(id) {
    if (!isValidObjectId(id)) throw { code: 401, msg: "inValid _id" };
    const campaign = await campaignController.readOne({ _id: id });
  
    if (!campaign) throw { code: 480, msg: "id campaign not exist!" };
    const messages = await campaignController.read({ _id: id }, "msg");
    return messages;
  }
  async function getOneMsg(campId, msgId) {
    if (!isValidObjectId(campId)) throw { code: 401, msg: "inValid _id" };
    if (!isValidObjectId(msgId)) throw { code: 401, msg: "inValid _id" };
  
    let camp = await campaignController.readOne({ _id: campId, "msg._id": msgId })
    if (!camp) throw { msg: "no messeges in this campaign", code: 404 }
  
    return camp.msg.find(m => m._id == msgId)
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
  module.exports ={ updateMsg , delOneMessage}