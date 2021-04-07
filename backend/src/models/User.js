const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

userSchema.methods.setPassword = async function (rawPassword) {
  try {
    const hash = await bcrypt.hash(rawPassword, parseInt(process.env.SALT_ROUNDS))
    this.password = hash
    return hash
  } catch (err) {
    throw new Error(err)
  }
}

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.PRIVATE_KEY)
}

userSchema.methods.verifyPassword = async function (rawPassword) {
  try {
    return await bcrypt.compare(rawPassword, this.password)
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = mongoose.model('User', userSchema)
