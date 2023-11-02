import { expressjwt } from 'express-jwt'
import jwtb from 'jsonwebtoken'

export const jwtAuth = expressjwt({
  secret: process.env.SERVER_SECRET,
  algorithms: ['HS256'],
  getToken: function fromHeaderOrQuerystring (req) {
    return req.headers.token
  }
})

export const errHandler = function (err, req, res, next) {
  if (err && err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...')
  } else {
    next()
  }
}

export function createToken (
  user = process.env.SERVER_USER,
  pass = process.env.SERVER_SECRET,
  expire = process.env.TOKEN_EXPIRED_TIME || '120y'
) {
  const x = jwtb.sign({
    id: user
  }, pass, { expiresIn: expire })
  return x
}

export function verify (token) {
  return jwtb.verify(token, process.env.SERVER_SECRET)
}
