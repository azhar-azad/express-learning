const mongoose = require('mongoose');
const slugify = require('slugify');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add category name']
  },
  slug: String,
  icon: String,
  color: String, // hash string like #001asaf1
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

CategorySchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Cascade delete products when a category is deleted
CategorySchema.pre('remove', async function (next) {
  console.log(`Products being removed for category ${this._id}`);
  await this.model('Product').deleteMany({ category: this._id });
  next();
});

module.exports = mongoose.model('Category', CategorySchema);