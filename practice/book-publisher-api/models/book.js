const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const bookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publishYear: {
    type: Number,
    required: true
  },
  publisher: {
    type: Schema.Types.ObjectID,
    ref: 'Publisher',
    required: true
  }
}, { timestamp: true });

module.exports = mongoose.model('Book', bookSchema);
