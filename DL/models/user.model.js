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
    // required: true,
    // אביעד אמר לא לעשות סיסמה חובה בגלל שאנשים נכנסים עם גוגל וכד'
    select: false,

  },
  phone: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },

  isActive: {
    type: Boolean,
    default: true
  },

  campaigns: [
    {
      campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "campaign",
      },
    },
  ],
  subscription: {
    type : String,
    enum : [ 'trial', 'active', 'cancelled'],
    default:'trial'
}
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;

