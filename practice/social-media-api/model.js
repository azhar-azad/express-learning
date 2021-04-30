const mongoose = require('mongoose');

// Define a Schema
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
    trim: true
  }
});

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
    text: String,
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
});

// Create models to use them
module.exports = mongoose.model('User', UserSchema);
module.exports = mongoose.model('Post', PostSchema);
