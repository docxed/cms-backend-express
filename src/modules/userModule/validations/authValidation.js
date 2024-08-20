const Joi = require('../../../utils/customJoi')

const registerSchema = Joi.object({
  email: Joi.string().max(100).email().required(),
  firstname: Joi.string().max(100).required(),
  lastname: Joi.string().max(100).required(),
  password: Joi.string().min(6).max(20).required(),
  confirm_password: Joi.required().valid(Joi.ref('password')),
})
const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

module.exports = {
  validateRegister: (data) => registerSchema.validate(data),
  validateLogin: (data) => loginSchema.validate(data),
}
