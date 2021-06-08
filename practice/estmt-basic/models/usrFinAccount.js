const mongoose = require('mongoose');

const usrFinAccountSchema = mongoose.Schema({
  usr_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usr',
    required: true
  },
  acct_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FinAccount',
    required: true
  }
});

usrFinAccountSchema.virtual('ufa_id').get(function () {
  return this._id.toHexString();
});
usrFinAccountSchema.set('toJSON', {
  virtuals: true
});

const UsrFinAccount = mongoose.model('UsrFinAccount', usrFinAccountSchema);

module.exports = UsrFinAccount;