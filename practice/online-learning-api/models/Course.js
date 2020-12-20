const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const courseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  createDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  enrolled: {
    type: Number
  },
  reviews: [{
    type: Schema.Types.ObjectID,
    ref: 'Review'
  }],
  enrolledStudents: [{
    type: Schema.Types.ObjectID,
    ref: 'Student'
  }]
});

module.exports = mongoose.model('Course', courseSchema);