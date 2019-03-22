import axios from 'axios'

const options = {}

if (process.server) {
  options.baseURL = 'http://localhost:5000'
}

export default axios.create(options)
