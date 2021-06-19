const mongoose = require('mongoose');

const paperless2Schema = mongoose.Schema({
  p_old_status: {
    type: String,
    required: true
  },
  p_latest_status: {
    type: String,
    required: true
  },
  stmt_type: {
    type: String
  },
  acct_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FinAccount',
    required: true
  }
});

paperless2Schema.virtual('paperless2_id').get(function () {
  return this._id.toHexString();
});
paperless2Schema.set('toJSON', {
  virtuals: true
});

const Paperless2 = mongoose.model('Paperless2', paperless2Schema);

module.exports = Paperless2;