const { update } = require("../DL/controllers/campaign.controller");
const userController = require("../DL/controllers/user.controller");
const { findByIdAndUpdate } = require("../DL/models/lead.model");

// get all users
async function getUsers() {
  let users = await userController.read()
  console.log("s", users)
  if (!users) {
    throw { code: 408, msg: 'something went wrong' }
  }
  return users
}

// get one user:
async function getOneUser(phone) {
  let user = await userController.readOne({ phone: phone })
  console.log("s", user)
  if (!user) {
    throw { code: 408, msg: 'something went wrong' }
  }
  return user
}

// delete user:
async function del(phone) {
  let user = await userController.update({ phone, isActive: true })
  if (!user) {
    throw { code: 408, msg: 'something went wrong' }
  }
  return user
}

// update one user:
async function updateOneUser(phone, data) {
  let user = await userController.updateUser({ phone: phone }, data)
  if (!user) {
    throw { code: 408, msg: 'something went wrong' }
  }
  return user
}


//add new user :
async function createNewUser(body) {
  const phoneIsExist = await userController.readOne({ phone: body.phone });
  if (!phoneIsExist) {
    const newUser = await userController.create({ ...body });
    return newUser
  }
  throw { code: 408, msg: 'This phone already exists' };
}


module.exports = { createNewUser, getUsers, getOneUser, del, updateOneUser }
