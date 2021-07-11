const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add comment'],
    trim: true,
    maxlength: [500, 'Comment should not exceed more than 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  article: {
    type: mongoose.Schema.ObjectId,
    ref: 'Article',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Comment', CommentSchema);