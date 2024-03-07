async function sendSpecificMsgToCampaignLeads(capId, msgId, userPhone) {
    if (!isValidObjectId(capId)) throw { code: 401, msg: "inValid  camp_id" };
    if (!isValidObjectId(msgId)) throw { code: 401, msg: "inValid msg_id" };
    if (!capId) throw { code: 404, msg: "No campaign found" };
    if (!msgId) throw { code: 404, msg: "No msg found" };
    let campaign = await campaignController.readOne({ _id: capId, "msg._id": msgId })
    if (!campaign) throw { msg: "no messeges in this campaign", code: 404 }
  
    let msg = campaign.msg.find(m => m._id == msgId);
    // const notSentLeadsList = await msgNotSentLeads(campaign, msgId);
    // console.log("*****filter******",notSentLeadsList, "//////////original/////////", campaign.leads);
    const leadsArr = msg.leads;
    console.log('msgLaRR',leadsArr);
    // const filtered = leadsArr.filter(l => )
    leadsArr.forEach((l) => {
      if (!l.isActive) return;
  
      const data = {
        phone: l["lead"].phone,
        name: l["lead"].name,
        _id: l["lead"]._id,
        msg: msg.content,
      };
      // socket1.emit("data", data);
    });
  
    //TODO: לעלות פה את הקאונטר או לחכות לתשובה מהווצפ שבאמת נשלח
    const user = userController.readOne({ phone: userPhone });
    const msgSentNow = user.messagesSent || 0
    const updatedMsgCounter = await userController.updateUser({ phone: phone }, { messagesSent: msgSentNow + 1 });
  
    if (msgSentNow >= 29) {
      const updatedSubscription = await userController.updateUser({ phone: phone }, { subscription: "expired" });
      throw { code: 403, msg: 'end of trial period' }
    }
  
    return { leads: campaign.leads, msg };
  }

  async function getMsgAndLead(capId, msgId, leadId) {
    if (!isValidObjectId(capId)) throw { code: 401, msg: "inValid camp_id" };
    if (!isValidObjectId(msgId)) throw { code: 401, msg: "inValid msg_id" };
    if (!isValidObjectId(leadId)) throw { code: 401, msg: "inValid lead_id" };
    if (!capId) throw { code: 404, msg: "No campaign found" };
    if (!msgId) throw { code: 404, msg: "No msg found" };
    if (!leadId) throw { code: 404, msg: "No lead found" };
    let sendMsg = await getOneMsg(capId, msgId);
    if (!sendMsg) throw { code: 404, msg: "This msg to send" };
    let campaign = await campaignController.readOne({ _id: capId });
    const arrNew = campaign["leads"];
    if (!arrNew) throw { code: 404, msg: "No lead **** found" };
    let filter = { _id: capId, "leads.lead": leadId };
    const list = await campaignController.readOne(filter);
    const lead = campaign.leads.find(
      (lead) => lead.lead._id.toString() === leadId.toString()
    );
  
    const singleLead = {
      phone: lead["lead"].phone,
      name: lead["lead"].name,
      _id: lead["lead"]._id,
      msg: sendMsg.content,
    };
    socket2.emit("singleLead", singleLead);
    finalArray = { leads: singleLead, msg: sendMsg };
    return finalArray;
  }