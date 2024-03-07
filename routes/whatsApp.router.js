//TODO

// send

const express = require("express");
const router = express.Router();



// TODO קוד QR
router.get("/QR/:leadId", async (req, res) => {
    try {
  
    } catch (err) {
      res
        .status(err.code || 500)
        .send({ msg: err.msg || "something went wrong" });
    }
  });

//TODO status
router.post("/:msgId/lead/:leadId", async (req, res) => {
    try {
  let status= req.params.data
  const leadId= req.params.leadId
  const msgId= req.params.msgId

} catch (err) {
      res
        .status(err.code || 500)
        .send({ msg: err.msg || "something went wrong" });
    }
  });
//TODO send
router.get("/campId/msg/:msgId", async (req, res) => {
    try {
  const campId= req.params.campId
  const msgId= req.params.msgId

} catch (err) {
      res
        .status(err.code || 500)
        .send({ msg: err.msg || "something went wrong" });
    }
  });


module.exports = router;