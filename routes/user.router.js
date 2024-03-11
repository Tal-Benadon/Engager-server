const express = require("express");
const router = express.Router();
const userService = require('../BL/account.service');
const auth = require("../middlewares/auth")


// add new user:
router.post('/', async (req, res) => {
  try {

    const body = req.body
    const answer = await userService.createNewUser(body);
    console.log({ "answer:": answer });
    const payload = {
      email: answer.email,
      phone: answer.phone,
      id: answer._id
    }
    const userLinkToken = await userService.createLinkToken(payload)
    console.log({ "inRouter": userLinkToken });
    const activationLink = `http://localhost:5173/activate-user/${userLinkToken}`
    res.send(answer);
  }
  catch (err) {
    console.log(err);
    res.status(err.code || 500).send({ msg: err.msg || "something went wrong" });
  }
})

router.post('/activate/:userToken', async (req, res) => {
  const token = req.params.userToken
  console.log({ "Token to Compare": token });
  try {
    const result = await userService.confirmNewUser(token)
    console.log(result);
    if (result.success === true) { res.send(result) }
  } catch (err) {
    res.status(err.code || 500).send({ msg: err.msg || "something went wrong" });
  }
})

router.use(auth.checkClient)


// get all users
router.get("/", async (req, res) => {
  try {
    console.log(req.body);
    const users = await userService.getUsers();
    console.log("r", users)
    res.send(users)

  } catch (err) {
    res.status(err.code || 500).send({ msg: err.msg || "something went wrong" });
  }
})

// get one user:
router.get("/:phone", async (req, res) => {
  try {
    console.log(req.params.phone);
    const phone = req.params.phone;
    const user = await userService.getOneUser(phone);
    console.log("r", user)
    res.send(user)

  } catch (err) {
    console.log(err);
    res.status(err.code || 500).send({ msg: err.msg || "something went wrong" });
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
    res.status(err.code || 500).send({ msg: err.msg || "something went wrong" });
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
    res.status(err.code || 500).send({ msg: err.msg || "something went wrong" });
  }
})

// ייצוא הראוטר
module.exports = router;
