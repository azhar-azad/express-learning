const mongoose = require('mongoose');

const usrSchema = mongoose.Schema({
  usr_firstname: {
    type: String,
    required: true,
    trim: true
  },
  usr_middlename: {
    type: String,
    trim: true
  },
  usr_lastname: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    trim: true
  }
});

usrSchema.virtual('usr_id').get(function () {
  return this._id.toHexString();
});
usrSchema.set('toJSON', {
  virtuals: true
});

const Usr = mongoose.model('Usr', usrSchema);

module.exports = Usr;