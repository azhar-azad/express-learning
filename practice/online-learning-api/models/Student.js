const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  passport: {
    type: Schema.Types.ObjectID,
    ref: 'Passport'
  },
  givenReviews: [{
    type: Schema.Types.ObjectID,
    ref: 'Review'
  }],
  enrolledCourses: [{
    type: Schema.Types.ObjectID,
    ref: 'Course'
  }]
});

module.exports = mongoose.model('Student', studentSchema);