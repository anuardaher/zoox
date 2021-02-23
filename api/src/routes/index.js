const router = require("express").Router()

router.use("/api/cidades", require("./city-routes"))
router.use("/api/estados", require("./state-routes"))

module.exports = router
