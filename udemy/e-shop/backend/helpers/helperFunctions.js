const expressJwt = require('express-jwt');

function authJwt() {
  const jwtTokenSecret = process.env.JWT_TOKEN_SECRET;
  const api = process.env.API;

  return expressJwt({
    secret: jwtTokenSecret,
    algorithms: ['HS256'],
    isRevoked: isRevoked
  }).unless({ // exclude those api from authentication
    path: [
      { // exclude all GET api that starts with /products
        url: /\/api\/v1\/products(.*)/, // exclude all api with /products
        methods: ['GET', 'OPTIONS']
      },
      { // exclude all GET api that starts with /categories
        url: /\/api\/v1\/categories(.*)/, // exclude all api with /categories
        methods: ['GET', 'OPTIONS']
      },

      `${api}/users/login`,
      `${api}/users/register`
    ]
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    // If any authorized API call by any user who is not admin, then the
    // token will be rejected/invalidate.
    done(null, true);
  }

  // authorized and admin
  done();
}

function errorHandler(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(500).json({message: 'User is not authorized', error: err});
  }

  // default to 500 server error
  return res.status(500).json({error: err});
}

module.exports = {authJwt, errorHandler};