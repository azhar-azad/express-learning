const mongoose = require('mongoose');

const paperlessSchema = mongoose.Schema({
  p_old_status: {
    type: String,
    required: true
  },
  p_new_status: {
    type: String,
    required: true
  },
  p_modified_date: {
    type: Date,
    default: new Date
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

paperlessSchema.virtual('p_id').get(function () {
  return this._id.toHexString();
});
paperlessSchema.set('toJSON', {
  virtuals: true
});

const Paperless = mongoose.model('Paperless', paperlessSchema);

module.exports = Paperless;