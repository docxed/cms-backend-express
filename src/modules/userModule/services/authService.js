const UserModel = require('../models/userModel')
const {
  validateRegister,
  validateLogin,
} = require('../validations/authValidation')
const { createError } = require('../../../utils/errorHandler')
const { userSerializer } = require('../serializers/userSerializer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  passwordHash: async (password) => {
    return await bcrypt.hash(password, 10)
  },
  registerUser: async (register) => {
    const { error, value: registerData } = validateRegister(register)
    if (error) throw error

    const userExist = await UserModel.findOne({ email: registerData.email })
    if (userExist)
      throw createError(400, 'User already exist', 'ValidationError')

    const passwordHash = await module.exports.passwordHash(
      registerData.password
    )
    const userCreated = await UserModel.create({
      email: registerData.email,
      firstname: registerData.firstname,
      lastname: registerData.lastname,
      password: passwordHash,
    })
    return userSerializer(userCreated)
  },
  generateToken: async (user) => {
    const payload = user
    return {
      access_token: jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 24 * 60 * 60, // 24 hours
      }),
      refresh_token: jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 7 * 24 * 60 * 60, // 7 days
      }),
    }
  },
  loginUser: async (login) => {
    const { error, value: loginData } = validateLogin(login)
    if (error) throw error

    const user = await UserModel.findOne({
      email: loginData.email,
      is_active: true,
    })
    if (!user) throw createError(400, 'User not found', 'ValidationError')
    const passwordMatch = await bcrypt.compare(
      loginData.password,
      user.password
    )
    if (!passwordMatch)
      throw createError(400, 'Invalid password', 'ValidationError')
    return await module.exports.generateToken(userSerializer(user))
  },
  getMe: async (_id) => {
    const user = await UserModel.findById(_id)
    return userSerializer(user)
  },
  validateRefreshToken: async (refreshToken) => {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)
      const user = await UserModel.findById(decoded._id)
      if (!user) throw createError(401, 'Invalid token', 'UnauthorizedError')
      return await module.exports.generateToken(user)
    } catch (err) {
      throw createError(401, 'Unauthorized', 'UnauthorizedError')
    }
  },
}
