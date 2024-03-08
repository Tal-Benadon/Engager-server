const express = require("express");
const router = express.Router();

// new lead by webhook from landing-page
router.post("/webhook/:campId", async (req, res) => {
    try {
  
    } catch (err) {
      res
        .status(err.code || 500)
        .send({ msg: err.msg || "something went wrong" });
    }
  });

// refresh webhook
router.post("/refresh/:campId", async (req, res) => {
    try {
  
    } catch (err) {
      res
        .status(err.code || 500)
        .send({ msg: err.msg || "something went wrong" });
    }
  });

module.exports = router;
