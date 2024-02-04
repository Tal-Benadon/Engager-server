const mongoose = require("mongoose");
const msgSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  leads: [
    {
      lead: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      receptinDate: {
        type: Date,
        default: Date.now,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
  ],
});

const campaignSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    default: "65ba97e536d6af41e9beb0d1",
  },
  title: {
    type: String,
    required: true,
  },

  msg: [msgSchema],

  leads: [
    {
      lead: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      joinDate: {
        type: Date,
        default: Date.now,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
  ],
});

const campaignModel = mongoose.model("campaign", campaignSchema);
module.exports = campaignModel  ;
