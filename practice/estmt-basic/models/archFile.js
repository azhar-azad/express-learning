const mongoose = require('mongoose');

const archFileSchema = mongoose.Schema({
  file_name: {
    type: String,
    required: true
  },
  file_type: {
    type: String
  }
});

archFileSchema.virtual('arch_file_id').get(function () {
  return this._id.toHexString();
});
archFileSchema.set('toJSON', {
  virtuals: true
});

const ArchFile = mongoose.model('ArchFile', archFileSchema);

module.exports = ArchFile;