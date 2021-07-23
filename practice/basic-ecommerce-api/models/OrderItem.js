const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: [true, 'Please provide the quantity']
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('OrderItem', OrderItemSchema);