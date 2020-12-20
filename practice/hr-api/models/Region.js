const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const regionSchema = new Schema({
  regionName: {
    type: String,
    required: true
  },
  countries: [{
    type: Schema.Types.ObjectID,
    ref: 'Country'
  }]
});

module.exports = mongoose.model('Region', regionSchema);