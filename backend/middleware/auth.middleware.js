const tokenService = require('../services/token.service')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const accessToken = req.headers.authorization.split(' ')[1]

    if (!accessToken) {
      return res.status(401).json({
        error: {
          message: 'UNAUTHORIZED',
          code: 401
        }
      })
    }

    const data = tokenService.verifyAccessToken(accessToken)

    req.user = data

    next()
  } catch (e) {
    res.status(401).json({
      error: {
        message: 'UNAUTHORIZED',
        code: 401
      }
    })
  }
}
