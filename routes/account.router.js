const express = require("express");
const router = express.Router();


router.post("/singin", async (req, res) => {
  try {

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
