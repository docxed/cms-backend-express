const Joi = require('../../../utils/customJoi')

const createBlogSchema = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().max(500).allow(null, ''),
})

module.exports = {
  validateCreateBlog: (data) => createBlogSchema.validate(data),
}
