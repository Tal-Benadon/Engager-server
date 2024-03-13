const feedbackModel = require('../models/feedback.model')


async function create(data){
    console.log(data);
    return await feedbackModel.create(data)
}

async function read(userId) {
    return await feedbackModel.find({ User: userId }).populate('User');
}

module.exports = {create,read}


