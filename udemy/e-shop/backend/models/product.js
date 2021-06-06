const mongoose = require('mongoose');

// Schema Definitions
const productSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  countInStock: {
    type: Number,
    trim: true,
    required: true
  }
});

// Model constructions
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
