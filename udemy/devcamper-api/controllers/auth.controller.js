const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async.middleware');

/** 
 * @description   Register user
 * @method        POST 
 * @route         /api/v1/auth/register
 * @access        Public
*/
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password, 
    role
  });

  // Create token
  const token = user.getSignedJwtToken();

  res.status(201).json({ success: true, token });
});

/** 
 * @description   Login user
 * @method        POST 
 * @route         /api/v1/auth/login
 * @access        Public
*/
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password'); // this .select is required because we have addded select: false in password field in the User model

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatched = await user.matchPassword(password);

  if (!isMatched) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Create token
  const token = user.getSignedJwtToken();

  res.status(201).json({ success: true, token });
});