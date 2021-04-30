const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const passportSchema = new Schema({
  number: {
    type: String,
    required: true
  },
  issueDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  expiredDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  forStudent: {
    type: Schema.Types.ObjectID,
    ref: 'Student'
  }
});

module.exports = mongoose.model('Passport', passportSchema);