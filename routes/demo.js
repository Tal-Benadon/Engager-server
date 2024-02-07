const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const campaignService = require('../BL/campaign.service');

const { ObjectId } = require('bson-objectid');

// Validate ObjectId
function isValidObjectId(id) {
  return ObjectId.isValid(id);
}

// Example usage
const objectIdToCheck = '5f7a1e6b8f8a1e5e42823121';
if (isValidObjectId(objectIdToCheck)) {
  console.log('Valid ObjectId');
} else {
  console.log('Invalid ObjectId');
}

 console.log(isValidObjectId ('aaaaaaaaaaaaaaaaaaaaaaaa'))
