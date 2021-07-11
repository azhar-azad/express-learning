const Section = require('../models/Section');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async.mw');

/**
 *  @desc   Get all sections
 *  @method GET
 *  @route  /api/v1/sections
 *  @access Public
 * */
exports.getSections = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .json(res.advancedResults);
});

/**
 *  @desc   Get single section
 *  @method GET
 *  @route  /api/v1/sections/:id
 *  @access Public
 * */
exports.getSection = asyncHandler(async (req, res, next) => {
  const section = await Section.findById(req.params.id).populate('user');

  if (!section) {
    return next(new ErrorResponse(`Section not found with id of ${req.params.id}`, 404));
  }

  res
    .status(200)
    .json({ success: true, data: section });
});

/**
 *  @desc   Create new section
 *  @method POST
 *  @route  /api/v1/sections
 *  @access Private [Logged in subeditor can create]
 * */
exports.createSection = asyncHandler(async (req, res, next) => {
  // Add user to req.body to save in the database
  req.body.user = req.user.id; // logged in user id

  const section = await Section.create(req.body);

  res
    .status(201)
    .json({ success: true, data: section });
});

/**
 *  @desc   Update section
 *  @method PUT
 *  @route  /api/v1/sections/:id
 *  @access Private [Logged in subeditor and owner can edit]
 * */
exports.updateSection = asyncHandler(async (req, res, next) => {
  let section = await Section.findById(req.params.id);

  if (!section) {
    return next(new ErrorResponse(`Section not found with id of ${req.params.id}`, 404));
  }

  // Make sure logged in subeditor is the creator i.e. owner or admin
  if (section.user.toString() !== req.user.id && req.user.role !== 'admin') {
    // req.user is not the owner or admin
    return next(new ErrorResponse(`User { ${req.user.id} } is not authorized to update section ${section._id}`, 401));
  }

  section = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

  res
    .status(200)
    .json({ success: true, data: section });
});

/**
 *  @desc   Delete section
 *  @method DELETE
 *  @route  /api/v1/sections/:id
 *  @access Private [Logged in subeditor and owner can delete]
 * */
exports.deleteSection = asyncHandler(async (req, res, next) => {
  const section = await Section.findById(req.params.id);

  if (!section) {
    return next(new ErrorResponse(`Section not found with id of ${req.params.id}`, 404));
  }

  // Make sure logged in subeditor is the creator i.e. owner or admin
  if (section.user.toString() !== req.user.id && req.user.role !== 'admin') {
    // req.user is not the owner or admin
    return next(new ErrorResponse(`User { ${req.user.id} } is not authorized to delete section ${section._id}`, 401));
  }

  section.remove();

  res
    .status(200)
    .json({ success: true, data: {} });
});