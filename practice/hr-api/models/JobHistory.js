const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const jobHistorySchema = new Schema({
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  employee: {
    type: Schema.Types.ObjectID,
    ref: 'Employee'
  },
  department: {
    type: Schema.Types.ObjectID,
    ref: 'Department'
  },
  job: {
    type: Schema.Types.ObjectID,
    ref: 'Job'
  }
});

module.exports = mongoose.model('JobHistory', jobHistorySchema);