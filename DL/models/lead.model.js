const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default:''
    // ???OK
  },
  phone: {
    type: String,  
    required: true,
  },
  notes: {
    type: String,
    default:''
  },
  campaigns: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "campaign"
    },
  ],
});
const leadModel = mongoose.model("lead", leadSchema);
module.exports = leadModel;
