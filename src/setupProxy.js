const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://47.98.159.95/', 
    changeOrigin: true,
    pathRewrite: {
      "^/api/": "/m-api/"
    }
  }))
}