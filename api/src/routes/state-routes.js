const router = require("express").Router()
const stateController = require("../controllers/state-controller")
const stateSchema = require("../policies/state-schema")

router.get("/", stateController.getAll)
router.get("/:id", stateController.findById)
router.post("/", stateSchema.create, stateController.save)
router.delete("/:id", stateController.remove)
router.put("/:id", stateController.update)

module.exports = router
