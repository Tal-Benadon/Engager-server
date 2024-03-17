const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    // required: true,
    // אביעד אמר לא לעשות סיסמה חובה בגלל שאנשים נכנסים עם גוגל וכד'
    select: false,
  },
  phone: {
    type: String,
    required: false,
  },

  isActive: {
    type: Boolean,
    default: false,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "plans",
    default: '65edcdf022a62790e4b5caf6'
  },
//   payment:[{
//     price:{
// type: Number
//     },
//     data:{

//     }
//   },]

  // ,

  createdData: {
    type: Date,
    default: Date.now(),
  },

  messagesSent: {
    type: Number,
    default: 0,
  },
  msgCount: {
    counter: {
      default: 0,
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    firstMsgCount: {
      default: 0,
      type: Number,
    },
  },
  amountOfEmployees: {
    type: String,
    enum: ['1', '2-7', '8-20', '20-100']
  },
  occupation: {
    type: String,
  }
  
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
