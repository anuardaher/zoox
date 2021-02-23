const CityModel = require("../models/city-model")

const find = async function (data, projection, options) {
  return CityModel.find(data, projection, options).lean()
}

const findById = async function (id, projection, options) {
  return CityModel.findById({ _id: id }, projection, options).lean()
}

const findOne = async function (data, projection, options) {
  return CityModel.findOne(data, projection, options).lean()
}

const create = async function (data) {
  const article = new CityModel(data)
  return article.save()
}

const remove = async function (id) {
  return CityModel.findOneAndDelete({ _id: id })
}

const update = async function (id, data) {
  return CityModel.findOneAndUpdate({ _id: id }, data, { new: true })
}

const list = (match, project, options) => {
  const pipelines = [
    { $match: match ?? {} },
    {
      $lookup: {
        from: "estados",
        localField: "estadoId",
        foreignField: "_id",
        as: "estado"
      }
    },
    { $unwind: "$estado" },
    { $limit: options?.limit ?? 5 },
    { $skip: options?.skip ?? 0 },
    { $sort: options?.sort ?? { 'createdAt': -1} }
  ]
  if (project) stages.push({ $project: project })
  return CityModel.aggregate(pipelines)
}

module.exports = {
  find,
  findOne,
  create,
  remove,
  update,
  findById,
  list
}
