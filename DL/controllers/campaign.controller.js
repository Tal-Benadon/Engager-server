const campaignModel = require('../models/campaign.model');


async function create(data){
    return await campaignModel.create(data)
}

async function read(filter){
    return await campaignModel.find(filter)
}

async function readOne(id){
    return await campaignModel.findById(id)
}

async function update(id,update){
    return await campaignModel.findByIdAndUpdate(id,update)
}

function deleteById(id) {
    return campaignModel.findByIdAndUpdate(id, {isActive:false})
  }


module.exports = {create,read,readOne,update,deleteById}