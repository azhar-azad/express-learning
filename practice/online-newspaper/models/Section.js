const mongoose = require('mongoose');
const slugify = require('slugify');

const SectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add section name'],
    trim: true,
    maxlength: [50, 'Section name should not be more than 50 characters']
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

SectionSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// // Cascade delete articles when a section is deleted
// UserSchema.pre('remove', async function (next) {
//   console.log(`Todos being removed for user ${this._id}`);
//   await this.model('Todo').deleteMany({ user: this._id });
//   next();
// });

module.exports = mongoose.model('Section', SectionSchema);