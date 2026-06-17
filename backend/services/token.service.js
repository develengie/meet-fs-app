const jwt = require('jsonwebtoken')
const config = require('config')
const Token = require('../models/Token')

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get('accessTokenSecretKey'), {
      expiresIn: '1h'
    })
    const refreshToken = jwt.sign(payload, config.get('refreshTokenSecretKey'))

    return { accessToken, refreshToken, expiresIn: 3600 }
  }

  async save(userId, refreshToken) {
    const data = await Token.findOne({ user: userId })

    if (data) {
      data.refreshToken = refreshToken

      return data.save()
    }

    const token = await Token.create({ user: userId, refreshToken })

    return token
  }

  verifyAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, config.get('accessTokenSecretKey'))
    } catch (e) {
      return e
    }
  }

  verifyRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get('refreshTokenSecretKey'))
    } catch (e) {
      return e
    }
  }

  async findRefreshToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken })
    } catch (e) {
      return e
    }
  }
}

module.exports = new TokenService()
