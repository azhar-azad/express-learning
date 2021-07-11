const Tag = require('../models/Tag');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async.mw');

/**
 *  @desc   Get all tags
 *  @method GET
 *  @route  /api/v1/tags
 *  @access Public
 * */
exports.getTags = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .json(res.advancedResults);
});

/**
 *  @desc   Get single tag
 *  @method GET
 *  @route  /api/v1/tags/:id
 *  @access Public
 * */
exports.getTag = asyncHandler(async (req, res, next) => {
  const tag = await Tag.findById(req.params.id).populate('user');

  if (!tag) {
    return next(new ErrorResponse(`Tag not found with id of ${req.params.id}`, 404));
  }

  res
    .status(200)
    .json({ success: true, data: tag });
});

/**
 *  @desc   Create new tag
 *  @method POST
 *  @route  /api/v1/tags
 *  @access Private [Logged in reporter can create]
 * */
exports.createTag = asyncHandler(async (req, res, next) => {
  // Add user to req.body to save in the database
  req.body.user = req.user.id; // logged in user id

  const tag = await Tag.create(req.body);

  res
    .status(201)
    .json({ success: true, data: tag });
});

/**
 *  @desc   Update tag
 *  @method PUT
 *  @route  /api/v1/tags/:id
 *  @access Private [Logged in reporter and owner can edit]
 * */
exports.updateTag = asyncHandler(async (req, res, next) => {
  let tag = await Tag.findById(req.params.id);

  if (!tag) {
    return next(new ErrorResponse(`Tag not found with id of ${req.params.id}`, 404));
  }

  // Make sure logged in subeditor/reporter is the creator i.e. owner or admin
  if (tag.user.toString() !== req.user.id && req.user.role !== 'admin') {
    // req.user is not the owner or admin
    return next(new ErrorResponse(`User { ${req.user.id} } is not authorized to update tag ${tag._id}`, 401));
  }

  tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

  res
    .status(200)
    .json({ success: true, data: tag });
});

/**
 *  @desc   Delete tag
 *  @method DELETE
 *  @route  /api/v1/tags/:id
 *  @access Private [Logged in reporter and owner can delete]
 * */
exports.deleteTag = asyncHandler(async (req, res, next) => {
  const tag = await Tag.findById(req.params.id);

  if (!tag) {
    return next(new ErrorResponse(`Tag not found with id of ${req.params.id}`, 404));
  }

  // Make sure logged in subeditor/reporter is the creator i.e. owner or admin
  if (tag.user.toString() !== req.user.id && req.user.role !== 'admin') {
    // req.user is not the owner or admin
    return next(new ErrorResponse(`User { ${req.user.id} } is not authorized to delete tag ${tag._id}`, 401));
  }

  tag.remove();

  res
    .status(200)
    .json({ success: true, data: {} });
});