const mongoose = require('mongoose');

const notificationHistorySchema = mongoose.Schema({
  notification_preference_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NotificationPreference',
    required: true
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

notificationHistorySchema.virtual('notification_history_id').get(function () {
  return this._id.toHexString();
});
notificationHistorySchema.set('toJSON', {
  virtuals: true
});

const NotificationHistory = mongoose.model('NotificationHistory', notificationHistorySchema);

module.exports = NotificationHistory;