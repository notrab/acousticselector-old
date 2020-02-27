const express = require('express')
const path = require('path')
const morgan = require('morgan')
const {sslRedirect} = require('./middleware')
const compression = require('compression')

const app = express()

const isDeveloping = app.get('env') === 'development'

if (!isDeveloping) {
  app.disable('x-powered-by')
  app.use(sslRedirect())
  app.use(compression())
  app.use(express.static(path.resolve(__dirname, '..', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
  })
}

if (isDeveloping) {
  app.use(morgan('dev'))
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {}
  })
})

module.exports = app
