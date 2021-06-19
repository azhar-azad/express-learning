const mongoose = require('mongoose');

const notificationPreferenceSchema = mongoose.Schema({
  email_address: {
    type: String
  },
  sms_number: {
    type: String
  },
  email_status: {
    type: String,
  },
  sms_status: {
    type: String,
  },
  stmt_type: {
    type: String
  },
  usr_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usr'
  },
  acct_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FinAccount'
  },
  ufa_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UsrFinAccount'
  }
});

notificationPreferenceSchema.virtual('notification_preference_id').get(function () {
  return this._id.toHexString();
});
notificationPreferenceSchema.set('toJSON', {
  virtuals: true
});

const NotificationPreference = mongoose.model('NotificationPreference', notificationPreferenceSchema);

module.exports = NotificationPreference;