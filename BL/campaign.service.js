const campaignController = require("../DL/controllers/campaign.controller");
const userController = require("../DL/controllers/user.controller")
const { io } = require("socket.io-client");
const socket1 = io(process.env.SOCKET_URL);
const { isValidObjectId } = require('./functions')
























// לקשר לפונקציה של טל שמכניסה לידים לmsg








module.exports = {
  // addNewMsg,
  // updateMsg,
  // getAllCampaignsByUser,
  // delOneMessage,
  // createNewCampaign,
  // getAllMsg,
  // getOneMsg,
  // updateMsgStatus,
  // delLeadFromCamp,
  // delCampaign,
  // getOneCamp,
  // updateMsgStatus,
  // delLeadFromCamp,
  // getMsgAndLead,
  // updateStatusMsgOfOneLead,
  // updateCampaing,
  // sendSpecificMsgToCampaignLeads,
};
