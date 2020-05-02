import jwt from 'jsonwebtoken'
import onSuccess from '../utils/onSuccess'

async function generateToken(data) {
  return jwt.sign(data, process.env.SALT_KEY, { expiresIn: '1d' })
}

async function decodeToken(token) {
  return jwt.decode(token, process.env.SALT_KEY)
}

async function authorize(req, res, next) {
  const authToken = req.body.token || req.query.token || req.headers['x-access']

  jwt.verify(authToken, process.env.SALT_KEY, function (error) {
    if (error) {
      res.status(401).json({
        message: 'Token Inválido',
      })
    } else {
      next()
      return onSuccess(res, 202, 'Login validado!')
    }
  })
}

export { generateToken, decodeToken, authorize }
