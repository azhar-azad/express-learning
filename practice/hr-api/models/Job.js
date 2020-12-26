const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const jobSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
    unique: true
  },
  minSalary: {
    type: Number,
    required: true
  },
  maxSalary: {
    type: Number
  },
  employees: [{
    type: Schema.Types.ObjectID,
    ref: 'Employee'
  }],
  jobHistory: {
    type: Schema.Types.ObjectID,
    ref: 'JobHistory'
  }
});

module.exports = mongoose.model('Job', jobSchema);