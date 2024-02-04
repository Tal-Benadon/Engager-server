const leadModel = require('../models/lead.model');
const campaignModel = require('../models/campaign.model')


const create = async (data) => {
    return await leadModel.create(data)
}

const update = async (id, newData) => {
    return leadModel.findByIdAndUpdate(id, newData)
}

// const read = async (filter) => {
//     return await leadModel.find(filter)
// }

// const readOne = async (filter) => {
//     const lead = await leadModel.findOne(filter)
//         .populate("campaigns")


//     return lead
// }

// getOne({ _id: "65bf91d6beecba97e97e8baf" })


// const turnInactive = async (id) => {
//     return await leadModel.findByIdAndUpdate(id, { isActive: false })
// }

// const turnActive = async (id) => {
//     await leadModel.findByIdAndUpdate(id, { isActive: true })
// }






module.exports = { create, update }