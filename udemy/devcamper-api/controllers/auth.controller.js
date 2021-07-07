const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async.middleware');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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

  sendTokenResponse(user, 200, res);
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

  sendTokenResponse(user, 200, res);
});

/** 
 * @description   Get current logged in user
 * @method        GET 
 * @route         /api/v1/auth/me
 * @access        Private
*/
exports.getMe = asyncHandler(async (req, res, next) => {
  // As this route will be protected, we will have access to req.user object
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

/**
 * @description   Update user details
 * @method        PUT
 * @route         /api/v1/auth/updatedetails
 * @access        Private
 */
exports.updateDetails = asyncHandler(async (req, res, next) => {
  // This update method is just for name and email.
  // Shouldn't update other fileds like password or role or staffs.
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

/**
 * @description   Update password
 * @method        PUT
 * @route         /api/v1/auth/updatepassword
 * @access        Private
 */
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(
      new ErrorResponse(`Password is incorrect`, 401)
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

/**
 * @description   Forgot password
 * @method        POST
 * @route         /api/v1/auth/forgotpassword
 * @access        Public
 */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // As this route will be protected, we will have access to req.user object
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new ErrorResponse(`There is no user with that email`, 404)
    );
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false }); // we do not want to run any validators like check the name or any other kinds of staffs.

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

  // This will be the email body
  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. 
    Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message
    });

    res
      .status(200)
      .json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);

    // Get rid of the following fields from the database
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // Save the user without validation
    await user.save({ validateBeforeSave: false });

    return next(
      new ErrorResponse('Email could not be sent', 500)
    );
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

/**
 * @description   Reset password
 * @method        PUT
 * @route         /api/v1/auth/resetpassword/:resettoken
 * @access        Public
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

  // Get user by resettoken that is not expired
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(
      new ErrorResponse(`Invalid token`, 400)
    );
  }

  // Set new password
  user.password = req.body.password;

  // Once the password is reset, we don't need those two.
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  // Update the user with new fields
  await user.save();

  sendTokenResponse(user, 200, res);
});


// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  // Only secure cookie when in production
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // Sending token as json response as well as with cookie.
  res
    .status(statusCode)
    .cookie('token', token, options) // cookie: name, value, options
    .json({
      success: true,
      token
    })
};