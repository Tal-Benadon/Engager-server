
const express = require("express");
const router = express.Router();
//TODO

// ראוטר account, לכתוב את הניתובים הבאים :


// TODO :update
router.put("/", async (req, res) => {
  try {

  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

// TODO users
router.get("/", async (req, res) => {
  try {

  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

// TODO  delete user
router.delete("/:userId", async (req, res) => {
  try {

  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});
// TODO get info for admin 
router.get("/info", async (req, res) => {
    try {
  
    } catch (err) {
      res
        .status(err.code || 500)
        .send({ msg: err.msg || "something went wrong" });
    }
  });



module.exports = router;
