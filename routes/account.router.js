const express = require("express");
const router = express.Router();
const accountService = require('../BL/account.service')
const userController = require('../DL/controllers/user.controller')
const userModel = require('../DL/models/user.model')
const jwt = require("jsonwebtoken")


router.post("/signin", async (req, res) => {
  try {

  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

router.get("/signInGoogle", async (req, res) => {
  try {
    const code = req.query.code;
    // let userToReturn = {}
    const { id_token, access_token } = await accountService.getGoogleOAuthTokens({
      code,
      redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    });
    const googleUser = await accountService.getGoogleUser({
      id_token,
      access_token,
    });

    if (!googleUser.res.verified_email) {
      throw new Error("Google user email is not verified.");
    }

    let userToReturn = await userModel.findOne({ email: googleUser.res.email });
    if (!userToReturn) {
      // Redirect the user to the registration page if they're not registered
      return res.redirect("http://localhost:5173/register");
    } else if (!userToReturn.phone) {
      // Redirect the user to complete their details if phone number is missing
      return res.redirect(`http://localhost:5173/completeDetails/${userToReturn.email}`);
    }

    const token = jwt.sign(
      { email: googleUser.res.email, userType: userToReturn.userType, _id:userToReturn._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    )

    res.redirect(`http://localhost:5173/redircetGoogle/${token}`)

  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

router.get("/signUpGoogle", async (req, res) => {
  try {

    const code = req.query.code;
    let userToReturn = {}

    const { id_token, access_token } = await accountService.getGoogleOAuthTokens({
      code,
      redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL_REGISTER,
    });

    const googleUser = await accountService.getGoogleUser({
      id_token,
      access_token,
    });

    if (!googleUser.res.verified_email) throw {msg:'forbiden',code:403}

    userToReturn = await userController.create({
      name: googleUser.res.name,
      email: googleUser.res.email
    })


    if (!userToReturn.phone) {
      return res.redirect(`http://localhost:5173/completeDetails/${userToReturn.email}`);
    }

    res.redirect('http://localhost:5173/login')


  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

router.post("/signup", async (req, res) => {
  try {

  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

// renew password - שינוי סיסמא
router.post("/renew", async (req, res) => {
  try {

  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

// reset password - איפוס סיסמא
router.post("/restore", async (req, res) => {
  try {

  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

// feedback - פידבק
router.post("/feedback", async (req, res) => {
  try {

  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

// dashboard  - מידע על חבילה, נתוני לידים והודעות, פרטים אישיים
router.get("/dashboard", async (req, res) => {
  try {

  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

module.exports = router;
