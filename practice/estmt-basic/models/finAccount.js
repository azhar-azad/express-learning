const mongoose = require('mongoose');

const finAccountSchema = mongoose.Schema({
  acct_number: {
    type: Number,
    required: true
  },
  acct_owner_name: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    trim: true
  },
  org_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  }
}, {
  timestamps: true
});

finAccountSchema.virtual('acct_id').get(function () {
  return this._id.toHexString();
});
finAccountSchema.set('toJSON', {
  virtuals: true
});

const FinAccount = mongoose.model('FinAccount', finAccountSchema);

module.exports = FinAccount;