const asyncHandler = require('../middlewares/async.mw');
const ErrorResponse = require('../utils/errorResponse');
const Category = require('../models/Category');

/**
 * @desc    Get all categories
 * @method  GET
 * @route   /api/v1/categories
 * @access  Public
 **/
exports.getCategories = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .json(res.advancedResults);
});

/**
 * @desc    Get single category
 * @method  GET
 * @route   /api/v1/categories/:id
 * @access  Public
 **/
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  res
    .status(200)
    .json({ success: true, data: category });
});

/**
 * @desc    Create new category
 * @method  POST
 * @route   /api/v1/categories
 * @access  Private (admin only)
 **/
exports.createCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);

  res
    .status(201)
    .json({ success: true, data: category });
});

/**
 * @desc    Update category
 * @method  PUT
 * @route   /api/v1/categories/:id
 * @access  Private (admin only)
 **/
exports.updateCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true
  });

  res
    .status(200)
    .json({ success: true, data: category });
});

/**
 * @desc    Delete category
 * @method  DELETE
 * @route   /api/v1/categories/:id
 * @access  Private (admin only)
 **/
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  category.remove();

  res
    .status(200)
    .json({ success: true, data: {} });
});
