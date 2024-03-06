const campaignController = require("../../DL/controllers/campaign.controller");
const userController = require("../../DL/controllers/user.controller")
const { io } = require("socket.io-client");
const socket1 = io("http://localhost:3000");
const { isValidObjectId } = require('../functions')

async function getAllCampaignsByUser(userId) {
    // do not touch!!!!
    if (!isValidObjectId(userId)) throw { code: 401, msg: "inValid _id" };
    const campaigns = await campaignController.read({ user: userId }); 
    // if (!campaigns.length) throw { code: 404, msg: "no campaigns for this user" };  להוסיף פילטר ללידים לפי  isactiv
    return campaigns;
  }


async function createNewCampaign(userId, body) {
    const {title, details , img}= body
    if (!isValidObjectId(userId)) throw { code: 401, msg: "inValid _id" };
    campName = title.trim();
    const nameIsExist = await campaignController.readOne({
      user: userId,
      title: campName,
    });
    if (nameIsExist) throw { code: 404, msg: "This name already exists" };
    const created = await campaignController.create({
      user: userId,
      title: campName,
      details: details,
      img: img
    });
    const updatedUser = await userController.updateOneByFilter({ _id: userId }, { $push: { campaigns: created._id } });
    if (updatedUser) console.log('update user', updatedUser);
   
    return created;


  }

  async function updateCampaing(campId, data) {

    const { title, details, img } = data;
    const filter = { _id: campId };
    const update = {};
  
    if (title) update.title = title;
    if (details) update.details = details;
    if (img) update.img = img;
  
    return await campaignController.update(filter, update);
  
  }
  async function delCampaign(campId) {
    if (!isValidObjectId(campId)) throw { code: 401, msg: "inValid _id" };
    const campaign = campaignController.readOne({ _id: campId });
    if (!campaign) throw { code: 404, msg: "Campaign is not exist!" };
    return await campaignController.update({ _id: campId }, { isActive: false });
  }

  
async function getOneCamp(campId) {
    if (!isValidObjectId(campId)) throw { code: 401, msg: "inValid _id" };
    const campaign = await campaignController.readOne({ _id: campId });
    if (!campaign) throw { msg: "Campaign is not exist", code: 404 };
    return campaign;
  }
  module.exports={createNewCampaign, }