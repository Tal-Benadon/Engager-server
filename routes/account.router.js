const express = require("express");
const router = express.Router();
//TODO

// ראוטר account, לכתוב את הניתובים הבאים :


// TODO :signin
router.post("/singin", async (req, res) => {
  try {

  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

// TODO signup

router.post("/signup", async (req, res) => {
  try {

  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

// TODO  renew 	(שינוי סיסמא)
router.post("/renew", async (req, res) => {
  try {

  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

// restore (איפוס סיסמא)
router.post("/restore", async (req, res) => {
  try {

  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

//TODO feedback (פידבק)
router.post("/feedback", async (req, res) => {
    try {

    } catch (err) {
      res
        .status(err.code || 500)
        .send({ msg: err.msg || "something went wrong" });
    }
  });

  //TODO  info/dashboard  (מידע על חבילה, נתוני לידים והודעות, פרטים אישיים)
  router.get("/info", async (req, res) => {
    try {

    } catch (err) {
      res
        .status(err.code || 500)
        .send({ msg: err.msg || "something went wrong" });
    }
  });
module.exports = router;
