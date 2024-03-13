const userController = require("../DL/controllers/user.controller");
const feedbackController = require("../DL/controllers/feedback.controller");

async function sendFeedback(userId, data) {

    let userExist = await userController.readOne({_id: userId});
    if (!userExist) throw { code: 500, msg: "Error creating feedback" };
    return await feedbackController.create(data);
}

async function getFeedbackById(userId) {

    let userExist = await userController.readOne({_id: userId});

    if (!userExist) throw { code: 500, msg: "Error getting feedbacks of user" };
    
    return await feedbackController.read(userId);
}




module.exports = { sendFeedback,getFeedbackById }
