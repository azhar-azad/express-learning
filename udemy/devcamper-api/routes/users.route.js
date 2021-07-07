const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users.controller');

// For middleware
const User = require('../models/User');
const advancedResults = require('../middlewares/advancedResults');

// mergeParams is set to true in order to find the params from calling router
const router = require('express').Router({ mergeParams: true });

// protect: to protect routes, user has to be logged in to access those routes.
// authorize: to authorize certain routes to certain user roles.
const { protect, authorize } = require('../middlewares/auth.middleware');

router.use(protect); // any route below this will have protect middleware
router.use(authorize('admin')); // any route below this will have authorize middleware

router.route('/')
  .get(advancedResults(User), getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;