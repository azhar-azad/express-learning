const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const locationSchema = new Schema({
  streetAddress: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: Schema.Types.ObjectID,
    ref: 'Country'
  },
  departments: [{
    type: Schema.Types.ObjectID,
    ref: 'Department'
  }]
});

module.exports = mongoose.model('Location', locationSchema);