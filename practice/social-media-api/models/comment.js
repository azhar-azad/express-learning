const mongoose = require('mongoose');

// Define a Schema
const Schema = mongoose.Schema;

// Create Post Schema
const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minLength: 0,
    maxLength: 100,
    trim: true
  },
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
