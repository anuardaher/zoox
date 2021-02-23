const stateRepository = require("../repository/state-repository")

const getAll = async (req, res) => {
  const { data = null, projection = null, options = null } = req.query
  try {
    const states = await stateRepository.find(
      JSON.parse(data),
      JSON.parse(projection),
      JSON.parse(options)
    )
    return res.status(200).json(states)
  } catch (error) {
    console.error(error.message)
    return res.status(500).send()
  }
}

const findById = async (req, res) => {
  try {
    const state = await stateRepository.findById(req.params.id)
    return res.status(200).json(state)
  } catch (e) {
    console.error(e.message)
    return res.status(500).send()
  }
}

const findOne = async (req, res) => {
  try {
    const state = await stateRepository.findOne({
      _id: { $regex: req.params.id }
    })
    return res.status(200).json(state)
  } catch (e) {
    console.error(e.message)
    return res.status(500).send()
  }
}

const save = async (req, res) => {
  try {
    const state = await stateRepository.create(req.body)
    return res.status(201).json(state)
  } catch (e) {
    console.error(e.message)
    return res.status(500).send()
  }
}

const remove = async (req, res) => {
  const { id } = req.params
  try {
    const state = await stateRepository.remove(id)
    if (!state) {
      return res.status(404).json(`state não encontrado para o id: ${req.params.id}`)
    }
    return res.status(200).send()
  } catch (e) {
    console.error(e.message)
    return res.status(500).send()
  }
}

const update = async (req, res) => {
  let state
  try {
    state = await stateRepository.update(req.params.id, req.body)
    if (!state)
      return res.status(404).json(`state não encontrado para o id: ${req.params.id}`)
    return res.status(200).json(state)
  } catch (e) {
    console.error(e)
    return res.status(500).send()
  }
}

module.exports = {
  getAll,
  save,
  remove,
  findById,
  findOne,
  update
}
