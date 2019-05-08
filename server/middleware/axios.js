module.exports = function() {
  const axios = require('../plugins/axios')

  return function(req, res, next) {
    if (req.session.authUser) {
      axios.default.defaults.headers.authcode =
        req.session.authUser.authcode || ''
      axios.default.defaults.headers.role = req.session.authUser.role || ''
      axios.default.defaults.headers.uuid = req.session.authUser.uuid || ''
    }

    return next()
  }
}
