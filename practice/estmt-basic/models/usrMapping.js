const mongoose = require('mongoose');

const usrMappingSchema = mongoose.Schema({
  cif_num: {
    type: String,
    required: true,
    trim: true
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
});

usrMappingSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
usrMappingSchema.set('toJSON', {
  virtuals: true
});

const UsrMapping = mongoose.model('UsrMapping', usrMappingSchema);

module.exports = UsrMapping;