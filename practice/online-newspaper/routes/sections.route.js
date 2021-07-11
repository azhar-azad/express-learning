const {
  getSections,
  getSection,
  createSection,
  updateSection,
  deleteSection
} = require('../controllers/sections.controller');
const { protect, authorize } = require('../middlewares/auth.mw');

const Section = require('../models/Section');
const advancedResults = require('../middlewares/advancedResults');

const router = require('express').Router();

router.route('/')
  .get(advancedResults(Section, {
    path: 'user',
    select: 'fullName email'
  }), getSections)
  .post(protect, authorize('subeditor', 'admin'), createSection);

router.route('/:id')
  .get(getSection)
  .put(protect, authorize('subeditor', 'admin'), updateSection)
  .delete(protect, authorize('subeditor', 'admin'), deleteSection);

module.exports = router;