const jwt = require('jsonwebtoken');
const asyncHandler = require('./async.middleware');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  let authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1]; // after spliting: [Bearer, token]. only take the second item.
  }

  // Not using cookies now. That's why it's commented out
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    // verify method will decode the jwt token like this { payload, iat(issued at), exp(when will expire) }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);

    req.user = await User.findById(decodedToken.id); // req.user will be currently logged in user
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});