const feedbackService = require('../BL/feedback.service')
const express = require("express");
const router = express.Router();


// feedback - פידבק
router.post('/:userId', async (req, res) => {

    try {
      let userId = req.params.userId;
      console.log("Message", req.body);
      const feedback = await feedbackService.sendFeedback(userId, req.body.data);
      if (!feedback) {
        return res.status(404).send({ msg: "User not found" });
      }
      res.send(feedback);
    } catch (err) {
      console.error(err);
      res.status(err.code || 500).send({ msg: err.msg || "Something went wrong" });
    }
  });



  router.get('/:userId', async (req, res) => {

    try {
      let userId = req.params.userId;
      const feedback = await feedbackService.getFeedbackById(userId);
      console.log(feedback);
      if (!feedback) {
        return res.status(404).send({ msg: "User not found" });
      }
      res.send(feedback);
    } catch (err) {
      console.error(err);
      res.status(err.code || 500).send({ msg: err.msg || "Something went wrong" });
    }
  });

  module.exports = router