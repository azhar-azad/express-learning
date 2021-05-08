const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender: String,
  status: String
});


const UserDoc = mongoose.model('userdoc', userSchema); // userdoc is the name of the mongo document that will store user data

module.exports = UserDoc;