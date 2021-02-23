const router = require("express").Router()
const cityController = require("../controllers/city-controller")
const citySchema = require("../policies/city-schema")

router.get("/", cityController.getAll)
router.get("/:id", cityController.findById)
router.post("/", citySchema.create, cityController.save)
router.delete("/:id", cityController.remove)
router.put("/:id", cityController.update)

module.exports = router
