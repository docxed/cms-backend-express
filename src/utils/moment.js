const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Bangkok')

moment.formatDateTime = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}
moment.formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD')
}

module.exports = moment
