const authService = require('../services/authService')
const { auth } = require('../../../middlewares/authMiddleware')

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const user = await authService.registerUser(req.body)
      res.status(201).json(user)
    } catch (err) {
      next(err)
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const user = await authService.loginUser(req.body)
      res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  },
  getMe: [
    auth,
    async (req, res, next) => {
      try {
        const user = await authService.getMe(req.user._id)
        if (!user) throw createError(401, 'Unauthorized', 'UnauthorizedError')
        res.status(200).json(user)
      } catch (err) {
        next(err)
      }
    },
  ],
  validateRefreshToken: async (req, res, next) => {
    try {
      const user = await authService.validateRefreshToken(
        req.body.refresh_token
      )
      res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  },
}
