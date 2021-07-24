const mongoose = require('mongoose');
const slugify = require('slugify');

const OrderSchema = new mongoose.Schema({
  orderItems: [{
    type: mongoose.Schema.ObjectId,
    ref: 'OderItem',
    required: true
  }],
  shippingAddress1: {
    type: String,
    required: [true, 'Please provide primary shipping address']
  },
  shippingAddress2: {
    type: String,
    required: [true, 'Please provide secondary shipping address']
  },
  city: {
    type: String,
    required: [true, 'Please provide city']
  },
  zip: {
    type: String,
    required: [true, 'Please provide zip']
  },
  country: {
    type: String,
    required: [true, 'Please provide country']
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone']
  },
  status: {
    type: String,
    required: [true, 'Please provide status'],
    default: 'Pending'
  },
  totalPrice: {
    type: Number
  },
  dateOrdered: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

OrderSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Order', OrderSchema);