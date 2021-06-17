const mongoose = require('mongoose');

const estmtFileSchema = mongoose.Schema({
  stmt_type: {
    type: String
  },
  esd_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EstmtDoc',
    required: true
  },
  arch_file_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArchFile',
    required: true
  }
});

const EstmtFile = mongoose.model('EstmtFile', estmtFileSchema);

module.exports = EstmtFile;