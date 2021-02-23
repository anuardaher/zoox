const Joi = require("joi")

module.exports = {
  create(req, res, next) {
    const schema = Joi.object().keys({
      nome: Joi.string().min(4).max(30).required(),
      estadoId: Joi.string().required()
    })

    const { error } = schema.validate(req.body)

    if (error) {
      let key = error.details[0].context.key
      res.status(422).json({
        error: `O campo ${key} não é válido. Verifique-o e tente novamente.`
      })
    } else {
      next()
    }
  }
}
