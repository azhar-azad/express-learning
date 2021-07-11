const mongoose = require('mongoose');
const slugify = require('slugify');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title should not be more than 100 characters']
  },
  slug: String,
  text: {
    type: String,
    required: [true, 'Please add text'],
    maxlength: [5000, 'Description can not be more than 5000 characters']
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  section: {
    type: mongoose.Schema.ObjectId,
    ref: 'Section',
    required: true
  },
  tags: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Tag',
    max: 5
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

ArticleSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// // Cascade delete comments when an article is deleted
// UserSchema.pre('remove', async function (next) {
//   console.log(`Todos being removed for user ${this._id}`);
//   await this.model('Todo').deleteMany({ user: this._id });
//   next();
// });

module.exports = mongoose.model('Article', ArticleSchema);