const asyncHandler = require('../middlewares/async.mw');
const ErrorResponse = require('../utils/errorResponse');
const Product = require('../models/Product');
const Category = require('../models/Category');

/**
 *  @desc   Get all products
 *  @method GET
 *  @route  /api/v1/products
 *  @route  /api/v1/categories/:categoryId/products
 *  @access Public
 * */
exports.getProducts = asyncHandler(async (req, res, next) => {
  if (req.params.categoryId) {
    // get all products under a category
    const products = await Product.find({ category: req.params.categoryId });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } else {
    // get all products from database
    res
      .status(200)
      .json(res.advancedResults);
  }
});

/**
 *  @desc   Get single product
 *  @method GET
 *  @route  /api/v1/products/:id
 *  @access Public
 * */
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate({
    path: 'category',
    select: 'name'
  });

  if (!product) {
    return next(
      new ErrorResponse(`No product found with the id of ${req.params.id}`, 404)
    );
  }

  res
    .status(200)
    .json({ success: true, data: product });
});

/**
 *  @desc   Create product
 *  @method POST
 *  @route  /api/v1/categories/:categoryId/products
 *  @access Private (seller, admin)
 * */
exports.createProduct = asyncHandler(async (req, res, next) => {
  req.body.category = req.params.categoryId;
  req.body.user = req.user.id;

  const category = await Category.findById(req.params.categoryId);

  if (!category) {
    return next(
      new ErrorResponse(`No category found with the id of ${req.params.categoryId}`, 404)
    );
  }

  const product = await Product.create(req.body);

  res
    .status(201)
    .json({ success: true, data: product });
});

/**
 *  @desc   Update product
 *  @method PUT
 *  @route  /api/v1/products/:id
 *  @access Private (seller:owner, admin)
 * */
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`No product found with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is this product's owner (creator)
  if (product.user.toString() !== req.user.id && req.user.role !== 'admin') {
    // req.user is not the owner and also not an admin.
    return next(
      new ErrorResponse(`User ${req.user.id} is not authorized to update this product`, 401)
    );
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true
  });

  res
    .status(200)
    .json({ success: true, data: product });
});

/**
 *  @desc   Delete product
 *  @method DELETE
 *  @route  /api/v1/products/:id
 *  @access Private (seller:owner, admin)
 * */
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`No product found with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is this product's owner (creator)
  if (product.user.toString() !== req.user.id && req.user.role !== 'admin') {
    // req.user is not the owner and also not an admin.
    return next(
      new ErrorResponse(`User ${req.user.id} is not authorized to update this product`, 401)
    );
  }

  product.remove();

  res
    .status(200)
    .json({ success: true, data: {} });
});

/**
 *  @desc   Get Featured Products
 *  @method GET
 *  @route  /api/v1/products/featured
 *  @access Public
 * */
exports.getProductsFeatured = asyncHandler(async (req, res, next) => {
  const featuredProducts = await Product.find({ isFeatured: true });

  res
    .status(200)
    .json({ success: true, count: featuredProducts.length, data: featuredProducts });
});
