const expressJwt = require('express-jwt');

function authJwt() {
  const jwtTokenSecret = process.env.JWT_SECRET;
  const api = process.env.API;

  return expressJwt({
    secret: jwtTokenSecret,
    algorithms: ['HS256'],
    isRevoked: isRevoked // isRevoked is true, if request is made by non-admin user
  }).unless({
    path: [
      `${api}/users/login`,
      `${api}/users/register`
    ]
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) // not admin
    done(null, true);

  // authorized and admin
  done();
}

function errorHandler(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(500).json({
      message: 'User is not authorized',
      error: err
    });
  }

  return res.status(500).json({ error: err });
}

module.exports = { authJwt, errorHandler };