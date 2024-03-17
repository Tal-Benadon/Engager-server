const express = require("express");
const router = express.Router();
const userService = require("../BL/account.service");
const campaignService = require("../BL/campaign.service");

const auth = require("../middlewares/auth");

// add new user:
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const answer = await userService.createNewUser(body);
    const payload = {
      email: answer.email,
      phone: answer.phone,
      id: answer._id
    }
    const userLinkToken = await userService.createLinkToken(payload)
    const activationLink = `${process.env.BASE_PATH}activate-user/${userLinkToken}`
    res.send(answer);
  } catch (err) {
    console.log(err);
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
})

router.post('/activate/:userToken', async (req, res) => {
  const token = req.params.userToken
  try {
    const result = await userService.confirmNewUser(token)
    res.send(result)
  } catch (err) {
    res.status(err.code || 500).send({ msg: err.msg || "something went wrong" });
  }
})



// get all users
router.get("/", async (req, res) => {
  try {
    console.log(req.body);
    const users = await userService.getUsers();
    console.log("r", users);
    res.send(users);
  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});



//route that creates a token and bring User



// get one user:
router.get("/:phone", async (req, res) => {
  try {
    const phone = req.params.phone;
    const user = await userService.getOneUser(phone);
    res.send(user);
  } catch (err) {
    console.log(err);
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
})


router.put("/update/:email", async (req, res) => {
  try {
    const email = req.params.email
    const data = req.body

    const updatedUser = await userService.completeUserDetails(email, data)

    const payload = {
      email: updatedUser.email,
      phone: updatedUser.phone,
      id: updatedUser._id
    }
    const userLinkToken = await userService.createLinkToken(payload)
    //send confirmationLink through whatsapp.
    const confirmationLink = `${process.env.BASE_PATH}activate-user/${userLinkToken}`
    console.log(confirmationLink);

    res.send(updatedUser)

  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

// update one user:
router.put("/:phone", async (req, res) => {
  try {
    const phone = req.params.phone;
    const data = req.body;

    const user = await userService.updateOneUser(phone, data);
    res.send(user);
  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

// delete one user:
router.delete("/:phone", async (req, res) => {
  try {
    const phone = req.params.phone;
    const user = await userService.del(phone);
    res.send(user);
  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

//get Lead From All Camps
router.get('/:userId/leads', async (req, res) => {
  try {
    const userId = req.params.userId;
    const campaigns = await campaignService.getAllCampaignsByUser(userId);
    const leadsArr = [];
    const campArr = [];
    let camp = "";
    campaigns.forEach((campaign) => {
      campaign.leads = campaign.leads.filter((lead) => lead.isActive);
      camp = campaign;
      campArr.push(camp.title);
      const mappedLeads = campaign.leads.map((lead) => ({
        name: lead.fullName,
        email: lead.email,
        phone: lead.phone,
        notes: lead.notes,
        joinDate: lead.joinDate,
        campaign: camp.title,
        _id: lead._id
      }));
      leadsArr.push(...mappedLeads);
    });

    const heads = [
      { title: "name", input: "text" },
      { title: "email", input: "text" },
      { title: "phone", input: "text" },
      { title: "joinDate", input: "date" },
      { title: "campaign", input: "select", inputValues: campArr },
      { title: "isOnline", input: "" },
    ];

    res.send({ leads: leadsArr, heads });
  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

// ייצוא הראוטר
module.exports = router;
