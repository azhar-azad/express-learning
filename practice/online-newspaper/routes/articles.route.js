const {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/articles.controller');
const { protect, authorize } = require('../middlewares/auth.mw');

const Article = require('../models/Article');
const advancedResults = require('../middlewares/advancedResults');

const router = require('express').Router({ mergeParams: true });

router.route('/')
  .get(advancedResults(Article, {
    path: 'user',
    select: 'email'
  }), getArticles)
  .post(protect, authorize('reporter', 'admin'), createArticle);

router.route('/:id')
  .get(getArticle)
  .put(protect, authorize('reporter', 'admin'), updateArticle)
  .delete(protect, authorize('reporter', 'admin'), deleteArticle);

module.exports = router;