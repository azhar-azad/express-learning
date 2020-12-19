const express = require('express');

const {
  createBook,
  getBooks,
  getBook
} = require('../controllers/bookController.js')

const bookRouter = express.Router();

// CREATE
bookRouter.post('/', createBook);

// GET ALL
bookRouter.get('/', getBooks);

// GET ONE BY ID
bookRouter.get('/:id', getBook);

module.exports = bookRouter;