const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const reviewSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  postDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  forCourse: {
    type: Schema.Types.ObjectID,
    ref: 'Course'
  },
  postedBy: {
    type: Schema.Types.ObjectID,
    ref: 'Student'
  }
});

module.exports = mongoose.model('Review', reviewSchema);