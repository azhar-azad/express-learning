const {
  getTags,
  getTag,
  createTag,
  updateTag,
  deleteTag
} = require('../controllers/tags.controller');
const { protect, authorize } = require('../middlewares/auth.mw');

// Include other resource routers
const articlesRouter = require('./articles.route');

const Tag = require('../models/Tag');
const advancedResults = require('../middlewares/advancedResults');

const router = require('express').Router();

// Re-route into other resource routers
router.use('/:tagId/articles', articlesRouter);

router.route('/')
  .get(advancedResults(Tag, {
    path: 'user',
    select: 'fullName email'
  }), getTags)
  .post(protect, authorize('subeditor', 'reporter', 'admin'), createTag);

router.route('/:id')
  .get(getTag)
  .put(protect, authorize('subeditor', 'reporter', 'admin'), updateTag)
  .delete(protect, authorize('subeditor', 'reporter', 'admin'), deleteTag);

module.exports = router;