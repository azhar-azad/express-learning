const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async.mw');
const Article = require('../models/Article');
const Section = require('../models/Section');
const Tag = require('../models/Tag');

/**
 *  @desc   Get all articles
 *  @method GET
 *  @route  /api/v1/articles
 *  @route  /api/v1/sections/:sectionId/articles
 *  @route  /api/v1/tags/:tagId/articles
 *  @access Public
 * */
exports.getArticles = asyncHandler(async (req, res, next) => {
  // /api/v1/sections/:sectionId/articles
  if (req.params.sectionId) {
    const articles = await Article.find({ section: req.params.sectionId });

    return res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });
  }

  // /api/v1/tags/:tagId/articles
  if (req.params.tagId) {
    const articles = await Article.find({ tag: req.params.tagId });

    return res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });
  }

  // /api/v1/articles
  res
    .status(200)
    .json(res.advancedResults);
});

/**
 *  @desc   Get single article
 *  @method GET
 *  @route  /api/v1/articles/:id
 *  @access Public
 * */
exports.getArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id)
    .populate('section')
    .populate('tag')
    .populate('user');

  if (!article) {
    return next(new ErrorResponse(`Article not found with id of ${req.params.id}`, 404));
  }

  res
    .status(200)
    .json({ success: true, data: article });
});

/**
 *  @desc   Create new article
 *  @method POST
 *  @route  /api/v1/sections/:sectionId/articles
 *  @access Private [Logged in reporter can create]
 * */
exports.createArticle = asyncHandler(async (req, res, next) => {
  // Add section id to req.body to save in the database
  req.body.section = req.params.sectionId;
  // Add user id to req.body to save in the database
  req.body.user = req.user.id; // logged in user id

  const section = await Section.findById(req.params.sectionId);

  if (!section) {
    return next(new ErrorResponse(`No section found with the id ${req.params.sectionId}`, 404));
  }

  let tagIds = req.body.tags;
  let isTagsValid = false;
  let promise = tagIds.forEach(async tagId => {
    const tag = await Tag.findById(tagId);

    if (tag) {
      isTagsValid = true;
    } else {
      return next(new ErrorResponse(`No tag found with the id ${tagId}`, 404));
    }
  });

  promise.resolve();

  if (isTagsValid) {
    const article = await Article.create(req.body);

    res
      .status(201)
      .json({ success: true, data: article });
  }
});


/**
 *  @desc   Update section
 *  @method PUT
 *  @route  /api/v1/sections/:id
 *  @access Private [Logged in subeditor and owner can edit]
 * */
exports.updateArticle = asyncHandler(async (req, res, next) => {
  let section = await Article.findById(req.params.id);

  if (!section) {
    return next(new ErrorResponse(`Article not found with id of ${req.params.id}`, 404));
  }

  // Make sure logged in subeditor is the creator i.e. owner or admin
  if (section.user.toString() !== req.user.id && req.user.role !== 'admin') {
    // req.user is not the owner or admin
    return next(new ErrorResponse(`User { ${req.user.id} } is not authorized to update section ${section._id}`, 401));
  }

  section = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

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
exports.deleteArticle = asyncHandler(async (req, res, next) => {
  const section = await Article.findById(req.params.id);

  if (!section) {
    return next(new ErrorResponse(`Article not found with id of ${req.params.id}`, 404));
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