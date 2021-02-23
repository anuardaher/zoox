const cityRepository = require("../repository/city-repository")

const getAll = async (req, res) => {
  const { data = null, projection = null, options = null} = req.query
  try {
    const citys = await cityRepository.list(
      JSON.parse(data),
      JSON.parse(projection),
      JSON.parse(options)
    )
    return res.status(200).json(citys)
  } catch (e) {
    console.error(e.message)
    return res.status(500).send(e.message)
  }
}

const findById = async (req, res) => {
  try {
    const city = await cityRepository.findById(req.params.id)
    return res.status(200).json(city)
  } catch (e) {
    console.error(e.message)
    return res.status(500).send(e.message)
  }
}

const findOne = async (req, res) => {
  try {
    const city = await cityRepository.findOne({
      _id: { $regex: req.params.id }
    })
    return res.status(200).json(city)
  } catch (e) {
    console.error(e.message)
    return res.status(500).send(e.message)
  }
}

const save = async (req, res) => {
  try {
    const city = await cityRepository.create(req.body)
    return res.status(201).json(city)
  } catch (e) {
    console.error(e.message)
    return res.status(500).send(e.message)
  }
}

const remove = async (req, res) => {
  const { id } = req.params
  try {
    const city = await cityRepository.remove(id)
    if (!city) {
      return res.status(404).json(`Cidade não encontrada para o id: ${req.params.id}`)
    }
    return res.status(200).send()
  } catch (e) {
    console.error(e.message)
    return res.status(500).send(e.message)
  }
}

const update = async (req, res) => {
  let city
  try {
    city = await cityRepository.update(req.params.id, req.body)
    if (!city)
      return res.status(404).json(`Cidade não encontrada para o id: ${req.params.id}`)
    return res.status(200).json(city)
  } catch (e) {
    console.error(e)
    return res.status(500).send(e.message)
  }
}

module.exports = {
  getAll,
  save,
  remove,
  findById,
  findOne,
  update,
}
