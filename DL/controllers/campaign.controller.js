const campaignModel = require('../models/campaign.model');


async function create(data) {
    return await campaignModel.create(data)
}


async function read(filter,select="") {
    return await campaignModel.find(filter).select(select)
}

async function readOne(id, populate) {
    populate = 'leads.lead'
    return await campaignModel.findOne({ _id: id }).populate(populate)
}

async function update(filter = {}, update) {
    return await campaignModel.updateOne(filter, update)
}

// update("65bf8ed2ff535f23eff98def", { msg: [{ leads: [{ lead: "65bf91d6beecba97e97e8baf" }] }] })

function deleteById(id) {
    return campaignModel.findByIdAndUpdate(id, { isActive: false })
}


module.exports = { create, read, readOne, update, deleteById,readOneCamp }