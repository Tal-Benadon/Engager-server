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
    // const {title, details , img}= body
    // if (!isValidObjectId(userId)) throw { code: 401, msg: "inValid _id" };
    // campName = title.trim();
    // const nameIsExist = await campaignController.readOne({
    //   user: userId,
    //   title: campName,
    // });
    // if (nameIsExist) throw { code: 404, msg: "This name already exists" };
    // const created = await campaignController.create({
    //   user: userId,
    //   title: campName,
    //   details: details,
    //   img: img
    // });
    // const updatedUser = await userController.updateOneByFilter({ _id: userId }, { $push: { campaigns: created._id } });
    // if (updatedUser) console.log('update user', updatedUser);
   
    // return created;

    const campaignObject = {
      user: "65ba97e536d6af41e9beb0d1", // ObjectId of the user
      title: "Your Campaign Title",
      details: "Your Campaign Details",
      isActive: true, // Or false if it's inactive
      img: "path_to_your_image.jpg", // Or null if there's no image
    
      msg: [
        {
          subject: "Message Subject 1",
          content: "Message Content 1",
          isActive: true // Or false if it's inactive
        },
        {
          subject: "Message Subject 2",
          content: "Message Content 2",
          isActive: true // Or false if it's inactive
        },
        // Add more messages if needed
      ],
    
      leads: [
        {
          name: "Lead Name 1",
          email: "lead1@example.com",
          phone: "1234567890",
          notes: "Notes about Lead 1",
          joinDate: new Date(), // Or specify a date
          isActive: true // Or false if it's inactive
        },
        {
          name: "Lead Name 2",
          email: "lead2@example.com",
          phone: "9876543210",
          notes: "Notes about Lead 2",
          joinDate: new Date(), // Or specify a date
          isActive: true // Or false if it's inactive
        },
        // Add more leads if needed
      ],
    

    };
    
    const res= await campaignController.create(campaignObject)
    return res
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