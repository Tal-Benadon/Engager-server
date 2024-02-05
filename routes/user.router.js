const express = require("express");
const router = express.Router();
const userService = require('../BL/user.service');


// get all users
router.get("/", async (req, res) => {
  try {
    const users = await userService.getUsers();
    console.log("r", users)
    res.send(users)

  } catch (err) {
    res.status(err.code).send(err.msg);
  }
})

// get one user:
router.get("/:phone", async (req, res) => {
  try {
    console.log(req.params.phone)
    const phone = req.params.phone
    const user = await userService.getOneUser(phone);
    console.log("r", user)
    res.send(user)

  } catch (err) {
    res.status(err.code).send(err.msg);
  }
})


// update one user:
router.put("/:phone", async (req, res) => {
  try {
    const phone = req.params.phone
    const data = req.body
    console.log("update phone:", phone)
    console.log("update data:", data)
    const user = await userService.updateOneUser(phone, data);
    console.log("r", user)
    res.send(user)

  } catch (err) {
    res.status(err.code).send(err.msg);
  }
})

// delete one user:
router.delete("/:phone", async (req, res) => {
  try {
    console.log(req.params.phone)
    const phone = req.params.phone
    const user = await userService.del(phone);
    console.log("r", user)
    res.send(user)

  } catch (err) {
    res.status(err.code).send(err.msg);
  }
})



// add new user:
router.post('/', async (req, res) => {
  try {

    const body = req.body
    // console.log("r", req.body);
    const answer = await userService.createNewUser(body);
    // console.log("rr", answer);
    res.send(answer);
  }
  catch (err) {
    res.status(err.code).send(err.msg);
  }
})
// ייצוא הראוטר
module.exports = router;
