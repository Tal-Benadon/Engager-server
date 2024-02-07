const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const campaignService = require('../BL/campaign.service');

function checkIdForMongoo(id){
    if (mongoose.isValidObjectId(id)) {
        
       let result = campaignService.findOne({ _id:id })
        return result
        // returns null if no record found.
   }
}



console.log(checkIdForMongoo ('aaaaaaaaaaaaaaaaaaaaaaaa'))
