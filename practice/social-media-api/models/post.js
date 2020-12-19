const mongoose = require('mongoose');

// Define a Schema
const Schema = mongoose.Schema;

// Create Post Schema
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
    trim: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

module.exports = mongoose.model('Post', PostSchema);
