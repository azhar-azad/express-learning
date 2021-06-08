const mongoose = require('mongoose');

const usrSessionSchema = mongoose.Schema({
  sess_login_id: {
    type: String,
    required: true
  },
  ses_active_status: {
    type: String,
  },
  sso_key: {
    type: String,
  },
  sso: {
    type: Date,
    default: Date.now
  },
  dso: {
    type: Date,
    default: Date.now
  },
  org_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  usr_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usr',
    required: true
  }
}, {
  timestamps: true
});

usrSessionSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
usrSessionSchema.set('toJSON', {
  virtuals: true
});

const UsrSession = mongoose.model('UsrSession', usrSessionSchema);

module.exports = UsrSession;