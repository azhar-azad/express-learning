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

module.exports = mongoose.model('User', UserSchema);