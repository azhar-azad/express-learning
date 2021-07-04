const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    require: [true, 'Please add a department name'],
    unique: true,
    trim: true,
    maxlength: [20, 'Department name can not be more than 20 characters']
  },
  manager: {
    type: mongoose.Schema.ObjectId,
    ref: 'Employee'
  },
  location: {
    type: mongoose.Schema.ObjectId,
    ref: 'Location',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Department', DepartmentSchema);