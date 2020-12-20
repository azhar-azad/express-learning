const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const employeeSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  hireDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  salary: {
    type: Number,
    required: true
  },
  department: {
    type: Schema.Types.ObjectID,
    ref: 'Department'
  },
  job: {
    type: Schema.Types.ObjectID,
    ref: 'Job'
  },
  jobHistory: {
    type: Schema.Types.ObjectID,
    ref: 'JobHistory'
  }
});

module.exports = mongoose.model('Employee', employeeSchema);