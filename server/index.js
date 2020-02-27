const http = require('http')
const app = require('./app')

const httpServer = http.Server(app)

const normalizePort = val => {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

const PORT = normalizePort(process.env.PORT || '5000')

httpServer.listen(PORT, () => {
  if (app.get('env') === 'development') {
    console.log(`> Server running on PORT ${PORT}`)
  }
})
