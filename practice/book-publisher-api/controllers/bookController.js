const Publisher = require('../models/publisher.js');
const Book = require('../models/book.js');

const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    
    const publisher = await Publisher.findById({ _id: book.publisher });
    publisher.publishedBooks.push(book);
    await publisher.save();
    
    res.status(201).json({
      success: true,
      data: book
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message
    });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json({
      success: true,
      data: books
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message
    });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book === null) {
      sendError(res, 404, 'Book is not found');
      return;
    }
    res.json({
      success: true,
      data: book
    });
  } catch (e) {
    sendError(res, 500, e);
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book === null) {
      sendError(res, 404, 'Book is not found');
      return;
    }
    const { name, author, publishYear } = req.body;
    
    if (name) book.name = name;
    if (author) book.author = author;
    if (publishYear) book.publishYear = publishYear;
    
    await book.save();
    
    res.json({
      success: true,
      data: book
    });
  } catch (e) {
    sendError(res, 500, e);
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book === null) {
      sendError(res, 404, 'Book is not found');
      return;
    }
    await book.remove();
    res.json({
      success: true,
      data: `Book Deleted: ${book.name}`
    });
  } catch (e) {
    sendError(res, 500, e);
  }
};

// PRIVATE METHODS ONLY FOR THIS MODULE
const sendError = (res, statusCode, error) => {
  res.status(statusCode).json({
    success: false,
    message: error.message
  });
};

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook
};