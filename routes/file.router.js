const express = require("express");
const router = express.Router();
//TODO


//TODO download/leads
router.get("/download/leads", async (req, res) => {
    try {
  
    } catch (err) {
      res
        .status(err.code || 500)
        .send({ msg: err.msg || "something went wrong" });
    }
  });

//TODO upload/leads
router.post("/upload/leads", async (req, res) => {
    try {
  
    } catch (err) {
      res
        .status(err.code || 500)
        .send({ msg: err.msg || "something went wrong" });
    }
  });

module.exports = router;