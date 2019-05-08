const { Router } = require('express')

const axiosMiddleware = require('../middleware/axios')
const mock = require('./mock')

const router = Router()

// CORS解决跨域问题
router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')

  next()
})

// router.use(axiosMiddleware)
// router.use(mock)
router.use('/mock', mock)

module.exports = router
