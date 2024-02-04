const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
  campaigns: [
    {
      campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "campaign",
      },
    },
  ],
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;


// הוספת יוזר - ניסיוני, לא להשתמש
// const starter = async () => {
//   const db = require('../db');
//   db.connect()
//   let newUser = await userModel.create({
//     fName: "מעיין",
//     lName: "הגבר",
//     email: "maayan@gmail.com",
//     avatar: "https://medias.timeout.co.il/www/uploads/2022/06/shutterstock_397680841-600x600.png",
//     password: "12345",
//     phone: "+972558739485",
//     whatsapp: "some url",
//     campaigns: []
//   })
//   console.log(newUser)
// };

// starter()
