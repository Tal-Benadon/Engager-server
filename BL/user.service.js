
const userController = require("../DL/controllers/user.controller");


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
  var regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
  const phoneIsExist = await userController.readOne({ phone: body.phone });
  if (phoneIsExist) {
    throw { code: 408, msg: 'This phone already exists' };
  }
  let error = false
  let email = body.email
  if (email.include("@" & ".")) {
    if (phone.length == 10) {
      if (password.length > 7) {
        if (regex.test(password)) {
        }
      }
    }
    error = true


    if (!error)
      const newUser = await userController.create({ ...body });
    return newUser
  }
  throw { code: 408, msg: 'something went wrong' };

  module.exports = { createNewUser, getUsers, getOneUser, del, updateOneUser }
