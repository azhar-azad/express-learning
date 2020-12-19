const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const publisherSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  publishedBooks: [{
    type: Schema.Types.ObjectID,
    ref: 'Book'
  }]
}, { timestamp: true });

module.exports = mongoose.model('Publisher', publisherSchema);
