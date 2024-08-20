const blogService = require('../services/blogService')
const { auth } = require('../../../middlewares/authMiddleware')

module.exports = {
  createBlog: [
    auth,
    async (req, res, next) => {
      try {
        const blog = req.body
        const createdBlog = await blogService.createBlog(blog, req.user)
        res.status(201).json(createdBlog)
      } catch (error) {
        next(error)
      }
    },
  ],
  getAllBlog: [
    auth,
    async (req, res, next) => {
      try {
        const {
          is_active,
          limit = 10,
          offset = 0,
          ordering = '-createdAt',
          search,
        } = req.query
        const filters = {}
        const paginations = {
          limit: parseInt(limit),
          offset: parseInt(offset),
          ordering,
          search,
        }
        if (is_active) filters.is_active = is_active
        const blogs = await blogService.getAllBlog(filters, paginations)
        res.status(200).json(blogs)
      } catch (error) {
        next(error)
      }
    },
  ],
  updateBlog: [
    auth,
    async (req, res, next) => {
      try {
        const blog = req.body
        const updatedBlog = await blogService.updateBlog(
          req.params.id,
          blog,
          req.user
        )
        res.status(200).json(updatedBlog)
      } catch (error) {
        next(error)
      }
    },
  ],
  deleteBlog: [
    auth,
    async (req, res, next) => {
      try {
        await blogService.deleteBlog(req.params.id)
        res.status(204).end()
      } catch (error) {
        next(error)
      }
    },
  ],
}
