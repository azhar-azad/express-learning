const mongoose = require('mongoose');

const enoticeSchema = mongoose.Schema({
  enotice_stamp: {
    type: Date,
    required: true
  },
  enotice_type: {
    type: String,
  },
  acct_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FinAccount',
    required: true
  },
  arch_file_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArchFile',
    required: true
  }
});

enoticeSchema.virtual('enotice_id').get(function () {
  return this._id.toHexString();
});
enoticeSchema.set('toJSON', {
  virtuals: true
});

const Enotice = mongoose.model('Enotice', enoticeSchema);

module.exports = Enotice;