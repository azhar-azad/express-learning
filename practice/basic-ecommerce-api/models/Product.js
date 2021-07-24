const mongoose = require('mongoose');
const slugify = require('slugify');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add product name']
  },
  description: {
    type: String,
    required: [true, 'Please add product description']
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
    required: [true, 'Please add the number of this product in stock'],
    min: 0,
    max: 255
  },
  avgRating: {
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true
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

ProductSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Cascade delete reviews when a product is deleted
ProductSchema.pre('remove', async function (next) {
  console.log(`Reviews being removed for product ${this._id}`);
  await this.model('Review').deleteMany({ product: this._id });
  next();
});

module.exports = mongoose.model('Product', ProductSchema);