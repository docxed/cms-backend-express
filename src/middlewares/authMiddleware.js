const { createError } = require('../utils/errorHandler')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(' ')[1]
  if (!accessToken) {
    return next(createError(401, 'Unauthorized', 'UnauthorizedError'))
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    next(createError(401, 'Unauthorized', 'UnauthorizedError'))
  }
}

module.exports = {
  auth,
}
