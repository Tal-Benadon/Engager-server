// ייבוא האקספרס
const express = require("express");
// הגדרת הראוטר בתוך האקספרס
const router = express.Router();
// ייבוא השירותים
const campaignService = require("../BL/campaign.service");

router.post("/msg/:msgId", async (req, res) => {
  try {
    const id = req.params.msgId;
    const msg = await campaignService.addNewMsg(id, req.body);
    res.send(msg);
  } catch (err) {
    res.status(err.code).send(err.msg);
  }
});

router.put("/msg/:msgId", async (req, res) => {
  try {
    const id = req.params.msgId;

    const msg = await campaignService.updateMsg(id, req.body);
    res.send(msg);
  } catch (err) {
    res.status(err.code).send(err.msg);
  }
});

// ייצוא הראוטר
module.exports = router;
