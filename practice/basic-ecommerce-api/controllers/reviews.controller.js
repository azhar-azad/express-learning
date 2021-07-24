const asyncHandler = require('../middlewares/async.mw');
const ErrorResponse = require('../utils/errorResponse');
const Review = require('../models/Review');
const Product = require('../models/Product');

/**
 *  @desc   Get all reviews
 *  @method GET
 *  @route  /api/v1/reviews
 *  @route  /api/v1/products/:productId/reviews
 *  @access Public
 * */
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.productId) {
    // get all reviews under a product
    const reviews = await Review.find({ product: req.params.productId })
      .populate({ path: 'user', select: 'fullName' });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } else {
    // get all reviews from database
    res
      .status(200)
      .json(res.advancedResults);
  }
});

/**
 *  @desc   Get single review
 *  @method GET
 *  @route  /api/v1/reviews/:reviewId
 *  @access Public
 * */
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id)
    .populate({ path: 'product', select: 'name' })
    .populate({ path: 'user', select: 'fullName' });

  if (!review) {
    return next(
      new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
    );
  }

  res
    .status(200)
    .json({ success: true, data: review });
});

/**
 *  @desc   Create new review
 *  @method POST
 *  @route  /api/v1/products/:productId/reviews
 *  @access Private [Logged in user can create]
 * */
exports.createReview = asyncHandler(async (req, res, next) => {
  req.body.product = req.params.productId;
  req.body.user = req.user.id;

  const product = await Product.findById(req.params.productId);

  if (!product) {
    return next(
      new ErrorResponse(`No product found with id of ${req.params.productId}`, 404)
    );
  }

  const review = await Review.create(req.body);

  res
    .status(201)
    .json({ success: true, data: review });
});

/**
 *  @desc   Update review
 *  @method PUT
 *  @route  /api/v1/reviews/:reviewId
 *  @access Private (user:owner)
 * */
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is this review's owner (creator)
  if (review.user.toString() !== req.user.id) {
    // req.user is not the owner
    return next(
      new ErrorResponse(`User ${req.user.id} is not authorized to update this review`, 401)
    );
  }

  Object.keys(req.body).forEach(item => review[item] = req.body[item]);
  await review.save();

  res
    .status(200)
    .json({ success: true, data: review });
});

/**
 *  @desc   Delete review
 *  @method DELETE
 *  @route  /api/v1/reviews/:reviewId
 *  @access Private (user:owner)
 * */
exports.deleteReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is this review's owner (creator)
  if (review.user.toString() !== req.user.id) {
    // req.user is not the owner
    return next(
      new ErrorResponse(`User ${req.user.id} is not authorized to update this review`, 401)
    );
  }

  review.remove();

  res
    .status(200)
    .json({ success: true, data: {} });
});