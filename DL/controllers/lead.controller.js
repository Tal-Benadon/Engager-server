const leadModel = require('../models/lead.model');

const create = async (data) => {
    return await leadModel.create(data)
}

const get = async (filter) => {
    return await leadModel.find(filter)
}

const getOne = async (filter) => {
    return await leadModel.findOne(filter).populate("campaign").populate("msg")
}
const update = async (id, newData) => {
    return leadModel.findByIdAndUpdate(id, newData)
}

const turnInactive = async (id) => {
    return await leadModel.findByIdAndUpdate(id, { isActive: false })
}

const turnActive = async (id) => {
    await leadModel.findByIdAndUpdate(id, { isActive: true })
}






module.exports = { create, get, getOne, update, turnInactive, turnActive }