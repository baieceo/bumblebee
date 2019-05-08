const axios = require('axios')

const options = {
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
}

options.baseURL =
  process.env.SERVER === 'aws' ? 'http://www.baidu.com' : 'http://www.damai.cn'

module.exports = axios.create(options)
