const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const countrySchema = new Schema({
  countryName: {
    type: String,
    required: true
  },
  region: {
    type: Schema.Types.ObjectID,
    ref: 'Region'
  },
  locations: [{
    type: Schema.Types.ObjectID,
    ref: 'Location'
  }]
});

module.exports = mongoose.model('Country', countrySchema);