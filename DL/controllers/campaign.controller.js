const campaignModel = require('../models/campaign.model');


async function create(data) {
    return await campaignModel.create(data)
}


async function read(filter) {
    return await campaignModel.find(filter)
}

async function readOne(id, populate) {
    populate = 'leads.lead'
    return await campaignModel.findOne({ _id: id }).populate(populate)
}

async function update(filter = {}, update) {
    return await campaignModel.findByIdAndUpdate(filter, update)
}

function deleteById(id) {
    return campaignModel.findByIdAndUpdate(id, { isActive: false })
}


module.exports = { create, read, readOne, update, deleteById }