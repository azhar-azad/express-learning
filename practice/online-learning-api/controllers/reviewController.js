const Review = require('../models/Review.js');
const Course = require('../models/Course.js');
const Student = require('../models/Student.js');

const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    
    const course = await Course.findById({ _id: review.forCourse });
    course.reviews.push(review);
    await course.save();
    
    const student = await Student.findById({ _id: review.postedBy });
    student.givenReviews.push(review);
    await student.save();
    
    res.status(201).json({
      success: true,
      data: review
    });
  } catch (e) {
    sendError(res, 400, e);
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json({
      success: true,
      data: reviews
    });
  } catch (e) {
    sendError(res, 500, e);
  }
};

const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (review === null) {
      sendError(res, 404, 'Review is not found');
      return;
    }
    
    res.json({
      success: true,
      data: review
    });
  } catch (e) {
    sendError(res, 500, e);
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (review === null) {
      sendError(res, 404, 'Review is not found');
      return;
    }
    
    const { text, rating } = req.body;
    
    if (text) review.text = text;
    if (rating) review.rating = rating;
    
    await review.save();
    
    res.json({
      success: true,
      data: review
    });
  } catch (e) {
    sendError(res, 500, e);
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review === null) {
      sendError(res, 404, 'Review is not found');
      return;
    }
    await review.remove();
    res.json({
      success: true,
      data: `Review Deleted with id: ${review._id}`
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
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview
};