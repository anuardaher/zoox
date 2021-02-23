const mongoose = require("mongoose")
const uuidv4 = require("uuid/v4")

const { Schema } = mongoose

const stateSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    nome: { type: String, required: true, trim: true },
    sigla: { type: String, required: true, trim: true, index: { unique: true }}
  },
  {
    timestamps: { currentTime: () => {
      const currentTime = new Date()
      return new Date(currentTime.setHours(currentTime.getHours() - 3))
    } }
  }
)

module.exports = new mongoose.model("estados", stateSchema)
