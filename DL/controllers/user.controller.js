const userModel = require('../models/user.model');
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;


// bcrypt.hash(password, saltRounds, function (error, hash) {
//     if (error) {
//         return res.status(500).json({ error })
//     }
// })



// add new user 
async function create(data) {
    let newUser = await userModel.create(data);
    // console.log(newUser);
    return newUser;
}
// get all users:
async function read() {
    let users = await userModel.find();
    return users;
}

// read one user
async function readOne(filter) {
    let user = await userModel.findOne(filter)
    return user
}

// update by filter
async function updateUser(phone, data) {

    let userToUpdate = await userModel.updateOne(phone, data)
    return userToUpdate;
}

module.exports = { create, read, readOne, updateUser }