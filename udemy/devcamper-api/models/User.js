const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // core module crypto is used to generate the password token and hash it [For forgot password route]

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [ // regex for email
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false // when we return a user, password field will not show
  },
  role: {
    type: String,
    // publishers are the people that can create bootcamps, courses
    // users are the people that can create reviews about bootcamps
    enum: ['user', 'publisher'],
    default: 'user'
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password using bcryptjs
UserSchema.pre('save', async function(next) {
  // While hitting forgotpassword route,
  // this middleware is being run.
  // But we will not have a password while hitting forgotpassword route.
  // To get around this,
  if (!this.isModified('password')) {
    // password field is not modified. so move along. do not execute remaining function codes.
    next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

// Sign JWT and return
// It is a mongoose method that actually being called on the 'user' data, not on the User model
// So, this._id refers to the user._id
// Also, this method can be called form controller
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
}

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  // compare between entered password and the password in the database 
  return await bcryptjs.compare(enteredPassword, this.password);
}

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field.
  // Save the hashed version of resetToken
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  // Return the original resetToken, not the hashed version
  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);