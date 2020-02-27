exports.sslRedirect = (environments, status) => {
  environments = environments || ['production']
  status = status || 302

  return (req, res, next) => {
    if (environments.includes(process.env.NODE_ENV)) {
      if (req.headers['x-forwarded-proto'] != 'https') {
        res.redirect(status, 'https://' + req.hostname + req.originalUrl)
      } else {
        next()
      }
    } else {
      next()
    }
  }
}
