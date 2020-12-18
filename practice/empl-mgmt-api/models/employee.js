import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  salary: {
    type: Number,
    required: true
  }
});

export default mongoose.model('Employee', EmployeeSchema);