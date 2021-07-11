const mongoose = require('mongoose');
const slugify = require('slugify');

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add tag name'],
    trim: true,
    maxlength: [20, 'Tag name should not be more than 20 characters']
  },
  slug: String,
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

TagSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Tag', TagSchema);