const mongoose = require('mongoose');

const estmtDocSchema = mongoose.Schema({
  esd_begindate: {
    type: Date,
    required: true
  },
  esd_closingdate: {
    type: Date,
    required: true
  },
  stmt_type: {
    type: String,
    default: 'default'
  },
  acct_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FinAccount',
    required: true
  }
});

estmtDocSchema.virtual('esd_id').get(function () {
  return this._id.toHexString();
});
estmtDocSchema.set('toJSON', {
  virtuals: true
});

const EstmtDoc = mongoose.model('EstmtDoc', estmtDocSchema);

module.exports = EstmtDoc;