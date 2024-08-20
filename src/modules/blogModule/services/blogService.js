const BlogModel = require('../models/blogModel')
const { validateCreateBlog } = require('../validations/blogValidation')
const { blogSerializer } = require('../serializers/blogSerializer')
const { applyOrdering, formatPaginatedResponse } = require('../../../utils')

module.exports = {
  createBlog: async (blog, user) => {
    const { error, value: blogData } = validateCreateBlog(blog)
    if (error) throw error
    const createdBlog = await BlogModel.create({
      title: blogData.title,
      description: blogData.description,
      createdBy: user._id,
    })
    return module.exports.getBlog(createdBlog._id)
  },
  getBlog: async (id) => {
    return blogSerializer(
      await BlogModel.findById(id).populate('createdBy').populate('updatedBy')
    )
  },
  getAllBlog: async (filters, { limit, offset, ordering, search }) => {
    const query = BlogModel.find(filters).skip(offset).limit(limit)

    if (search) {
      query.where({
        title: { $regex: search, $options: 'i' },
      })
    }
    applyOrdering(query, ordering)
    const blogs = await query.populate('createdBy').populate('updatedBy')
    const totalCount = await BlogModel.countDocuments(filters)
    const paginatedResponse = formatPaginatedResponse(
      blogs,
      totalCount,
      limit,
      offset
    )
    return {
      count: paginatedResponse.count,
      next: paginatedResponse.next,
      previous: paginatedResponse.previous,
      results: paginatedResponse.results.map(blogSerializer),
    }
  },
  updateBlog: async (id, blog, user) => {
    const { error, value: blogData } = validateCreateBlog(blog)
    if (error) throw error
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      {
        title: blogData.title,
        description: blogData.description,
        updatedBy: user._id,
      },
      { new: true }
    )
      .populate('createdBy')
      .populate('updatedBy')
    return blogSerializer(updatedBlog)
  },
  deleteBlog: async (id) => {
    return BlogModel.findByIdAndUpdate(id, { is_active: false })
  },
}
