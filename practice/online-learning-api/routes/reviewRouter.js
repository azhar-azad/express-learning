const express = require('express');

const {
  createReview,
  getReviews,
  deleteReview
} = require('../controllers/reviewController.js');

const reviewRouter = express.Router();

// CREATE REVIEW
reviewRouter.post('/', createReview);

// GET ALL REVIEWS
reviewRouter.get('/', getReviews);

// DELETE REVIEW BY ID
reviewRouter.delete('/:id', deleteReview);

module.exports = reviewRouter;