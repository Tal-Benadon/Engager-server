const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: String,
  price: Number,
  max_num_leads: Number,   
  leads_from_webhook: Boolean,
  contact_management_interface: Boolean,
  num_leads_in_list: Number,    // max num camp 
  opening_msg_to_new_lids : Number,   // max Wellcome Msg
  msg_number : Number,   //total Msg
  uploading_file_list : Boolean,
  data_transfer_crm : Boolean,  //transfer Data
  split_terminals : Boolean, //split Terminals
  notification_new_lead : Boolean,  //notification FOR New Lead
  copywriting_msg : Boolean ,  //msg Copywriting
  connection_to_whatsApp : Boolean , //whatsApp Connection
  customer_journey : Boolean , //journey For Client
  technical_support : Boolean,
  update_version : Boolean,
});
const planModel = mongoose.model("plan", planSchema);
module.exports = planModel;