const StateModel = require("../models/state-model")

const find = async (data, projection) => {
  return StateModel.find(data, projection).lean()
}

const findById = async (id, projection) => {
  return StateModel.findById(id, projection).lean()
}

const findOne = async (data, projection) => {
  return StateModel.findOne(data, projection)
}

const create = async (data) => {
  const user = new StateModel(data)
  if (data.password) user.setPassword(data.password)
  return user.save()
}

const remove = async (id, projection) => {
  return StateModel.findOneAndDelete({ _id: id }, projection)
}

const update = async (id, data, projection) => {
  return StateModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
    fields: projection
  })
}

module.exports = { find, findOne, create, remove, update, findById }
