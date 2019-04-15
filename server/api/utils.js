module.exports = {
  stringify(json) {
    return JSON.stringify(json, (k, v) => {
      if (typeof v === 'function') {
        return v + ''
      }

      return v
    })
  },
  parse(str, _req, Mock) {
    return JSON.parse(str, (k, v) => {
      if (v.indexOf && v.indexOf('function') > -1) {
        const code = v
          .replace(/^function[\s]*\([^\(\)]*\)[\s]*\{[\r\n]*/, '')
          .replace(/[\r\n\s\t]*\}$/, '')

        return new Function(
          '_req',
          'Mock',
          `return (function (_req, Mock) { ${code} })(_req, Mock)`
        )(_req, Mock)
      }

      return v
    })
  },
  mock(req, Mock) {
    const _req = {}

    console.log(123, req.body)

    // 获得请求 url 地址
    _req.url = req.body.data.URI
    // 获取请求方法
    _req.method = req.body.data.method
    // 获取 url 参数对象
    _req.params = {}
    // 获取查询参数字符串(url中?后面的部分)，不包含 ?
    _req.querystring = ''
    // 将查询参数字符串进行解析并以对象的形式返回，如果没有查询参数字字符串则返回一个空对象
    _req.query = {}
    // 当 post 请求以 x-www-form-urlencoded 方式提交时，我们可以拿到请求的参数对象
    _req.body = {}
    // 获取请求路径名
    _req.path = ''
    // 获取请求头对象
    _req.header = {}
    // 获取请求原始地址
    _req.originalUrl = ''
    // 获取查询参数字符串，包含 ?
    _req.search = ''
    // 获取 host (hostname:port)
    _req.host = ''
    // 获取 hostname
    _req.hostname = ''
    // 获取请求 Content-Type，不包含像 "charset" 这样的参数
    _req.type = ''
    // 返回请求协议
    _req.protocol = ''
    // 请求远程地址
    _req.ip = ''

    // 获取请求 header 中对应 field 的值
    _req.get = field => {}

    // 获取请求 cookies 中对应 field 的值
    _req.cookies = field => {}

    try {
      return this.parse(
        this.stringify(eval('(' + req.body.data.code + ')')),
        _req,
        Mock
      )
    } catch (e) {
      return {
        _mock: {
          error: {
            message: 'An error occurred while generating mock data'
          }
        }
      }
    }
  }
}
