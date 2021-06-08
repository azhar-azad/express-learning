const mongoose = require('mongoose');

const organizationSchema = mongoose.Schema({
  org_uniquename: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  org_displayname: {
    type: String,
    required: true,
    trim: true
  },
  schema_name: {
    type: String,
    required: true,
    trim: true
  }
});

organizationSchema.virtual('org_id').get(function () {
  return this._id.toHexString();
});
organizationSchema.set('toJSON', {
  virtuals: true
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;