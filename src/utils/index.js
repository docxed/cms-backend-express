function applyOrdering(query, ordering) {
  if (ordering) {
    const sortOptions = ordering.split(',').reduce((acc, field) => {
      const trimmedField = field.trim()
      const order = trimmedField.startsWith('-') ? -1 : 1
      const fieldName = trimmedField.replace(/^-/, '')
      acc[fieldName] = order
      return acc
    }, {})

    query.sort(sortOptions)
  }
}

function formatPaginatedResponse(blogs, totalCount, limit, offset) {
  return {
    count: totalCount,
    next: offset + limit < totalCount ? offset + limit : null,
    previous: offset > 0 ? Math.max(0, offset - limit) : null,
    results: blogs,
  }
}

module.exports = { applyOrdering, formatPaginatedResponse }
