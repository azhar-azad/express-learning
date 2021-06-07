const mongoose = require('mongoose');

// Schema Definitions
const productSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  richDescription: {
    type: String,
    default: 'Provide more description'
  },
  image: {
    type: String,
    default: 'No image url is given'
  },
  images: [{
    type: String
  }],
  brand: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

// Following is to use virtuals to have an 'id' field that
// will have the value of '_id'.
// It will be more frontend friendly.
// Maximum frontend app will want to use 'id' instead of '_id'
productSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
productSchema.set('toJSON', {
  virtuals: true
});

// Model constructions
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
