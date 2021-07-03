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