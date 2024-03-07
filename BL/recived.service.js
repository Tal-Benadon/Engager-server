
async function msgSentLeads(campaignObj, msgId) {
    const msgObject = campaignObj?.msg?.find?.(msgObj => msgObj._id === msgId)
    const arrayOfLeadsInMsg = msgObject?.leads || []
  
    return arrayOfLeadsInMsg
  }
  
  async function msgNotSentLeads(campaignObj, msgId) {
    const leadsInCampaign = campaignObj.leads;
    const sentLeadsResultsArray =await msgSentLeads(campaignObj, msgId);
    const NotSentLeadsArray = leadsInCampaign.filter(campLead => !sentLeadsResultsArray.some(msgLead => msgLead._id === campLead._id));
  
    return NotSentLeadsArray
  }
  async function pushAllCampaignLeadsToMsgLeads(campaignId, targetMsgId) {
    if (!isValidObjectId(campaignId)) throw { code: 401, msg: "inValid _id" };
    if (!isValidObjectId(targetMsgId)) throw { code: 401, msg: "inValid _id" };
    try {
      const campaignToUpdate = await campaignController.readOne({
        _id: campaignId,
      });
  
      const leadIds = campaignToUpdate.leads.map((lead) => ({ lead: lead._id }));
      console.log(leadIds);
  
      const targetMsg = campaignToUpdate.msg.find((msg) =>
        msg._id.equals(targetMsgId)
      );
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
  
async function updateStatusMsgOfOneLead(data) {
    const { campId, msgId, leadId, issend } = data;
    console.log('issend', issend);
    if (issend != "sent" && issend != "recieved")
      throw { code: 405, msg: "status not valid" };
    const campaign = await campaignController.readOneWithoutPopulate({
      _id: campId
    });
    if (!campaign) throw { code: 405, msg: "no campaign" };
    const message = campaign["msg"].find((m) => m._id == msgId);
    console.log("message",message);
    const lead = message["leads"].find((l) => l.lead == leadId);
    lead.status = issend;
    const updatedCampaign = await campaign.save();
    return updatedCampaign;
  }
  
  socket1.on('connect', () => {
    console.log('Connected to server');
  });
  
   socket1.on('sent', async (data) => {
    try{
      console.log(data.rtrnData);
      // const res = await updateStatusMsgOfOneLead(data.rtrnData)  לצורך בדיקה הורדתי 
      // console.log(res);
  
    }
    catch(err){
      console.error(err)
    }
  });