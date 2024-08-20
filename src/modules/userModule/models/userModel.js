const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      max: 100,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
      max: 100,
    },
    lastname: {
      type: String,
      required: true,
      max: 100,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 20,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
