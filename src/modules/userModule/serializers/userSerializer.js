const moment = require('../../../utils/moment')

module.exports = {
  userSerializer: (user) => {
    return {
      _id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      createdAt: moment.formatDateTime(user.createdAt),
      updatedAt: moment.formatDateTime(user.updatedAt),
    }
  },
}
