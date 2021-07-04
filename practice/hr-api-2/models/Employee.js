const mongoose = require('mongoose');
const slugify = require('slugify');

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add a first name'],
    trim: true,
    maxlength: [30, 'First name can not be more than 30 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Please add a last name'],
    trim: true,
    maxlength: [30, 'Last name can not be more than 30 characters']
  },
  slug: String,
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [ // regex validation for email
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phoneNumber: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters']
  },
  hireDate: {
    type: Date,
    default: Date.now
  },
  salary: {
    type: Number,
    required: [true, 'Please add salary'],
    min: [1, 'Salary can not be zero or negative']
  },
  isManager: {
    type: Boolean,
    default: false
  },
  job: {
    type: mongoose.Schema.ObjectId,
    ref: 'Job',
    required: true
  },
  department: {
    type: mongoose.Schema.ObjectId,
    ref: 'Department',
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

// Create Employee slug from email
EmployeeSchema.pre('save', function(next) {
  let mark = this.email.indexOf('@');
  this.slug = slugify(this.email.substring(0, mark), { lower: true });
  next();
});

module.exports = mongoose.model('Employee', EmployeeSchema);