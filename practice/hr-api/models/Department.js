const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const departmentSchema = new Schema({
  departmentName: {
    type: String,
    required: true
  },
  location: {
    type: Schema.Types.ObjectID,
    ref: 'Location'
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

module.exports = mongoose.model('Department', departmentSchema);