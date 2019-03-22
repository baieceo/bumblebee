const { Router } = require('express')
const Mock = require('mockjs')
const axios = require('../plugins/axios')
const utils = require('./utils')

const router = Router()

router.get('/', function(req, res) {
  res.json({
    code: 0,
    msg: 'Mock Get API'
  })
})

router.post('/', function(req, res) {
  res.json(utils.mock(req, Mock))
})

module.exports = router
