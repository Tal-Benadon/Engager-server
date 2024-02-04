const userModel = require('../models/user.model');

// get all users
async function read(filter = {}) {
    let users = await userModel.find({ filter });
    return users;
}

// read one user
async function readOne(filter) {
    let user = await userModel.findOne(filter).populate('campaigns.campaign');
    return user;
}

// update by filter
async function update(filter, data) {
    let userToUpdate = await userModel.updateOne(filter, data)
    return userToUpdate;
}

module.exports = { read, readOne, update }