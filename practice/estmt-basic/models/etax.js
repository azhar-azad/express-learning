const mongoose = require('mongoose');

const etaxSchema = mongoose.Schema({
  etax_stamp: {
    type: Date,
    required: true
  },
  etax_type: {
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

etaxSchema.virtual('etax_id').get(function () {
  return this._id.toHexString();
});
etaxSchema.set('toJSON', {
  virtuals: true
});

const Etax = mongoose.model('Etax', etaxSchema);

module.exports = Etax;