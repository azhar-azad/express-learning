const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    trim: true,
    required: true
  },
  phone: {
    type: String,
    trim: true,
    required: true
  },
  address: {
    type: String,
    trim: true
  },
  registered: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    trim: true,
    default: false
  }
});

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
userSchema.set('toJSON', {
  virtuals: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;