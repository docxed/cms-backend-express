const moment = require('../../../utils/moment')

module.exports = {
  blogSerializer: (blog) => {
    return {
      _id: blog._id,
      title: blog.title,
      description: blog.description,
      create_by_name: blog.createdBy
        ? `${blog.createdBy.firstname} ${blog.createdBy.lastname}`
        : null,
      updated_by_name: blog.updatedBy
        ? `${blog.updatedBy.firstname} ${blog.updatedBy.lastname}`
        : null,
      createdAt: moment.formatDateTime(blog.createdAt),
      updatedAt: moment.formatDateTime(blog.updatedAt),
    }
  },
}
