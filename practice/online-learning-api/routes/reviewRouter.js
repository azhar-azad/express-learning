const express = require('express');

const {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController.js');

const reviewRouter = express.Router();

// CREATE REVIEW
reviewRouter.post('/', createReview);

// GET ALL REVIEWS
reviewRouter.get('/', getReviews);

// GET REVIEW
reviewRouter.get('/:id', getReview);

// UPDATE REVIEW
reviewRouter.patch('/:id', updateReview);

// DELETE REVIEW BY ID
reviewRouter.delete('/:id', deleteReview);

module.exports = reviewRouter;