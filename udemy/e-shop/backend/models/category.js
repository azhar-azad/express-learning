const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  color: { // hash string like #001asaf1
    type: String
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;