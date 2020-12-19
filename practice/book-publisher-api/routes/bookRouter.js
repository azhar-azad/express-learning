const express = require('express');

const {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController.js')

const bookRouter = express.Router();

// CREATE
bookRouter.post('/', createBook);

// GET ALL
bookRouter.get('/', getBooks);

// GET ONE BY ID
bookRouter.get('/:id', getBook);

// UPDATE ONE BY ID
bookRouter.patch('/:id', updateBook);

// DELETE ONE BY ID
bookRouter.delete('/:id', deleteBook);

module.exports = bookRouter;