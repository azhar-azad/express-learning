const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async.mw');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

/**
 *  @desc   Register user
 *  @method POST
 *  @route  /api/v1/auth/register
 *  @access Public
 * */
exports.register = asyncHandler(async (req, res, next) => {
  const { fullName, username, email, password, role, phone } = req.body;

  // Create user
  const user = await User.create({
    fullName,
    username,
    email,
    password,
    role,
    phone
  });

  sendTokenResponse(user, 200, res);
});

/**
 *  @desc   Login user
 *  @method POST
 *  @route  /api/v1/auth/login
 *  @access Public
 * */
exports.login = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user by email
  // While retrieving user select password field too for validation
  const user = await User.findOne({ email }).select('+password');

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
 *  @desc   Get current logged in user
 *  @method GET
 *  @route  /api/v1/auth/me
 *  @access Private [Logged in user can access]
 * */
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res
    .status(200)
    .json({ success: true, data: user });
});

/**
 *  @desc   Update user details
 *  @method PUT
 *  @route  /api/v1/auth/updatedetails
 *  @access Private [Logged in user can access]
 * */
exports.updateDetails = asyncHandler(async (req, res, next) => {
  // Only update fullName, email and phone number.

  // Copy req.body
  let reqBody = { ...req.body };

  // Fields to exclude (does not update those fields)
  const bodyItemsToRemove = [
    'password',
    'role',
    'resetPasswordToken',
    'resetPasswordExpire'
  ];

  // Loop over bodyItemsToRemove and delete them from request body
  let forbiddenItems = [];
  bodyItemsToRemove.forEach(item => {
    if (item in reqBody) {
      // Add the forbidden fileds to forbiddenItems array, if sent via req.body
      forbiddenItems.push(item);
    }
    // Also, delete from reqBody
    delete reqBody[item];
  });

  if (forbiddenItems && Object.keys(forbiddenItems).length !== 0) {
    let errorMsg = 'Can not update';
    forbiddenItems.forEach(item => errorMsg += (' ' + item + ','));
    errorMsg = errorMsg.substring(0, errorMsg.length - 1);
    return next(new ErrorResponse(errorMsg, 400));
  }

  const user = await User.findByIdAndUpdate(req.user.id, reqBody, {
    new: true,
    runValidators: true
  });

  res
    .status(200)
    .json({ success: true, data: user });
});

/**
 *  @desc   Change password
 *  @method PUT
 *  @route  /api/v1/auth/changepassword
 *  @access Private [Logged in user can access]
 * */
exports.changePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

/**
 *  @desc   Forgot password
 *  @method POST
 *  @route  /api/v1/auth/forgotpassword
 *  @access Public [Anyone can access]
 * */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is not user with that email', 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  // We do not want to run any validation while saving
  await user.save({ validateBeforeSave: false });

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

    // Get rid of token and expiration date from database
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // Save the user without validation
    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

/**
 *  @desc   Reset password
 *  @method PUT
 *  @route  /api/v1/auth/resetpassword/:resettoken
 *  @access Public [Anyone can access]
 * */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

  // Get user by hashed resettoken that is not expired
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = req.body.password;

  // Once the password is reset, we don't need token and expiration date
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  // Update the user with new fields
  await user.save();

  sendTokenResponse(user, 200, res);
});


/** Util Method **/
// Get token from model, create cookie and send response
// This is just a helper function
// A token will be created and sent with json response when this function will be called
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  // Cookie options
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000), // 1d
    httpOnly: true
  };

  // Only secure cookie when in production
  if (process.env.APP_ENV === 'production') {
    options.secure = true;
  }

  // Sending token as json response as well as with cookie.
  res
    .status(statusCode)
    .cookie('token', token, options) // cookie: name, value, options
    .json({
      success: true,
      token
    });
}